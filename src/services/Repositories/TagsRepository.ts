import { createConnection } from "../SqlService";
import SongModel from "../../web/models/SongModel";
import TagModel from "../../web/models/TagModel";
import SongTagModel from "../../web/models/SongTagModel";

class TagsRepository {
    static getTagsBySongId = (songId: number) => {
        console.log('This was entered');
        return new Promise((resolve, reject) => {
            const connection = createConnection();
            connection.query(
                'SELECT songs.*, tags.*, song_tags.songTagId FROM songs INNER JOIN song_tags ON songs.songId = song_tags.songId INNER JOIN tags ON song_tags.tagId = tags.tagId WHERE songs.songId = ?',
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
            )
        })
    }

    static getTags = () => {
        return new Promise((resolve, reject) => {
            resolve([]); // TODO: Make this properly resolve all tags
        })
    }
}

export default TagsRepository;