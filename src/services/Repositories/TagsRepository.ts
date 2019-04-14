import { createConnection } from "../SqlService";
import SongTagModel from "../../web/models/SongTagModel";

class TagsRepository {
    static getTagsBySongId = (songId: number) => {
        return new Promise((resolve, reject) => {
            const connection = createConnection();
            connection.query(
                `
                    SELECT songs.*, tags.*, song_tags.songTagId 
                    FROM songs 
                        INNER JOIN song_tags ON songs.songId = song_tags.songId 
                        INNER JOIN tags ON song_tags.tagId = tags.tagId 
                    WHERE songs.songId = ?
                `,
                [songId],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        const tagModels = results.map((result: SongTagModel) => ({
                            songTagId: result.songTagId,
                            tagId: result.tagId,
                            label: result.label,
                        }))
                        resolve(tagModels);
                    }
                }
            );
            connection.end();
        })
    }

    static getTags = () => {
        return new Promise((resolve, reject) => {
            const connection = createConnection();
            connection.query(
                `SELECT * from tags`,
                [],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
            connection.end();
        })
    }
}

export default TagsRepository;