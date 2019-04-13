import mysql from 'mysql';
import config from '../config.json';

const createConnection = () => {
  const connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
  });
  return connection;
}

export {
  createConnection,
}