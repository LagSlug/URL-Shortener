import ShortUrl from "./ShortURL";
import { Sequelize } from 'sequelize';

type Options = {
  database: string;
  hostname: string;
  port: number;
  username: string;
  password: string;
}

export default function load(options: Options) {

  // load sequelize
  const sequelize = new Sequelize({
    database: options.database,
    host: options.hostname,
    port: options.port,
    username: options.username,
    password: options.password,
    dialect: 'mysql',
    logging: false
  });

  // load models
  ShortUrl.load(sequelize);

  return sequelize;
}