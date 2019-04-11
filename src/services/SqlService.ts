import mysql, { MysqlError } from 'mysql';
import config from '../config.json';
import SongModel from '../web/models/SongModel.js';

const createConnection = () => {
  const connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
  });
  return connection;
}

class SongsRepository {

  static getSongs = (): Promise<void | SongModel[]> => {
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

  static getSongMetadata = (signature: string): Promise<void | any> => {
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

  static insertSong = (signature: string, file: Express.Multer.File) => {
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

  static updateSong = (song: SongModel) => {
    return new Promise((resolve, reject) => {
      const connection = createConnection();
      const songKeys = Object.keys(song).filter((key) => key !== 'songId');
      const params = songKeys.map((key: string) => `${key}=?`).join(', ');
      const values = songKeys.map((key: string) => (song as any)[key]);
      values.push(song.songId);
      connection.query(
        `UPDATE songs SET ${params} WHERE songId=?`,
        values,
        (err) => {
          if (err) {
            reject(err);
          }
          resolve(song);
        }
      );
    })
  }

  static getSong = (songId: number) => {
    return new Promise((resolve, reject) => {
      const connection = createConnection();
      connection.query(
        'SELECT * FROM songs WHERE songId=?',
        songId,
        (err: MysqlError | null, results?: any) => {
          if (err) {
            reject(err);
          } else {
            if (results.length > 1) {
              reject('Err: Multiple results found');
            }
            resolve(results[0]);
          }
        }
      )
      connection.end();
    })
  }

}

export {
  SongsRepository,
}