import start from '../src';
import dotenv from 'dotenv';
dotenv.config();

start({
  port: parseInt(process.env.PORT),
  hostname: process.env.HOSTNAME,
  mysql: {
    database: process.env.MYSQL_DATABASE,
    hostname: process.env.MYSQL_HOSTNAME,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  }
})