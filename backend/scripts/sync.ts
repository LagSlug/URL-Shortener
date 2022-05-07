import store from '../src/models/store';
import dotenv from 'dotenv';
import mysql, { Connection } from 'mysql2';
dotenv.config();

runSync().then(()=>process.exit()).catch(err=>console.error(err))

async function runSync() {
  const connection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    port: parseInt(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  })

  
  await createDatabase(connection, process.env.MYSQL_DATABASE)

  const sequelize = store({
    database: process.env.MYSQL_DATABASE,
    hostname: process.env.MYSQL_HOSTNAME,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  })

  await sequelize.sync({ force: true });
  console.log('sync complete!')
}


function createDatabase(connection: Connection, name: string ) {
  return new Promise((resolve, reject) => {

    connection.connect(function(err) {
      if (err) throw err;
      connection.query(`CREATE DATABASE IF NOT EXISTS ${name}`, function (err, result) {
        if (err) reject(err);
        else resolve(result);
      });
    })
  });
}
