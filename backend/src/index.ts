import express from 'express';
import store from './models/store';
import ShortURL from './models/ShortURL';
import ShortUniqueId from 'short-unique-id';
import normalizeUrl from './normalize-url';
import validUrl from 'valid-url';

const uid = new ShortUniqueId({ length: 5 });

type Props = {
  port: number;
  hostname: string;
  mysql: {
    database: string;
    hostname: string;
    port: number;
    username: string;
    password: string;
  }
}
export default function start(props: Props) {
  const app = express();
  
  store({
    database: process.env.MYSQL_DATABASE,
    hostname: process.env.MYSQL_HOSTNAME,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  })

  app.use(express.json())

  app.get('/:code', async function(req, res) {
    const { code } = req.params;

    const shortURL = await ShortURL.findOne({
      where: {
        code
      }
    })
    if(shortURL) {      

      res.redirect(normalizeUrl(shortURL.url));
    }
    else {
      res.status(404).send();
    }
  });

  app.post('/', async function(req, res) {
    var { url } = req.body as { url: string };
    
    if(url.indexOf('http') !== 0) {
      url = 'http://' + url
    }

    // validate url
    if(!validUrl.isUri(url)) {
      res.status(400).json({
        error: 'url is invalid'
      })
      return;
    }

    var shortURL: ShortURL
    var tries = 0;
    while(!shortURL && tries < 10) {
      tries++;
      try {
        [shortURL] = await ShortURL.findOrCreate({
          where: {
            url
          },
          defaults: {
            url,
            code: uid()
          }
        });        
        res.json({
          code: shortURL.code
        });

        return;
      } catch (error) {
        console.error(error);
      }

    }
    
    res.json({
      error: {
        message: 'could not generate short url',
        code: 0
      }
    });
  })

  return new Promise((resolve, reject)=>{
    const listener = app.listen(props.port, props.hostname, function() {
      console.log(listener.address())
      resolve({ app, listener });
    })
  })
}

