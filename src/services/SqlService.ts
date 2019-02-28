import mysql, { MysqlError } from 'mysql';
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

const getSongs = (): Promise<void | any> => {
  return new Promise((resolve, reject) => {

    const connection = createConnection();
    connection.query(
      `SELECT songId, songName, signature FROM songs`,
      (err: MysqlError | null, results?: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    )

  })
}

const getSongMetadata = (signature: string): Promise<void | any> => {
  return new Promise((resolve, reject) => {

    const connection = createConnection();
    connection.query(
      `SELECT * FROM songs WHERE signature="${signature}"`,
      (err: MysqlError | null, results?: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    )
    connection.end();

  })
}

const insertSong = (signature: string, file: Express.Multer.File) => {
  return new Promise((resolve, reject) => {
    const connection = createConnection();
    connection.query(
      'INSERT INTO songs SET ?',
      {
        songName: file.originalname,
        songData: file.buffer,
        signature: signature
      },
      (err: MysqlError | null, results?: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    )
    connection.end();
  })
}

const getSong = (songId: number) => {
  return new Promise((resolve, reject) => {
    const connection = createConnection();
    connection.query(
      'SELECT * FROM songs WHERE songId=?',
      songId,
      (err: MysqlError | null, results?: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    )
    connection.end();
  })
}

export {
  getSongMetadata,
  insertSong,
  getSong,
  getSongs,
}
