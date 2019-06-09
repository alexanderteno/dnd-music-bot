import TagModel, { isTagModel } from "../../web/models/TagModel";
import { asyncQueryFirst, asyncQuery, asyncInsert } from "./util/AsyncUtil";
import SongTagModel from "../../web/models/SongTagModel";
import PlaylistModel from "../../web/models/PlaylistModel";

class TagsRepository {

    static getPlaylists = async (): Promise<PlaylistModel[]> => {
        return await asyncQueryFirst<{ label: string, tagId: number }[]>(
            'SELECT DISTINCT tags.label, tags.tagId FROM song_tags LEFT JOIN tags ON song_tags.tagId = tags.tagId',
            [],
        );
    }

    static createSongTag = async (songId: number, tagId: number): Promise<SongTagModel> => {
        return await asyncQueryFirst<SongTagModel>(`INSERT INTO song_tags (songId, tagId) VALUES (?, ?)`, [songId, tagId]);
    }

    static insertTag = async (songId: number, requestTag: TagModel): Promise<TagModel> => {

        const tagId = isTagModel(requestTag) ?
            requestTag.tagId :
            await asyncInsert<TagModel>(`INSERT INTO tags (label) VALUES (?)`, [requestTag]);
        const tag = await asyncQueryFirst<TagModel>(`SELECT * FROM tags WHERE tagId = ?`, [tagId]);

        const songTagExists = !!(await asyncQueryFirst<SongTagModel>(`SELECT * FROM song_tags WHERE songId = ? AND tagId = ?`, [songId, tag.tagId]));

        if (!songTagExists) {
            await asyncQueryFirst<SongTagModel>(`INSERT INTO song_tags (songId, tagId) VALUES (?, ?)`, [songId, tag.tagId]);
            return tag;
        } else {
            throw 'Duplicate tag not permitted.';
        }
    }

    static getTagsBySongId = async (songId: number): Promise<TagModel[]> => {
        const tags = await asyncQuery<TagModel>(`
            SELECT 
                tags.tagId, 
                tags.label,
                song_tags.songTagId 
                FROM songs 
                    INNER JOIN song_tags ON songs.songId = song_tags.songId 
                    INNER JOIN tags ON song_tags.tagId = tags.tagId 
                WHERE songs.songId = ?
        `, [songId]);
        return tags;
    }

    static getTags = (): Promise<TagModel[]> => {
        const tags = asyncQuery<TagModel>(`SELECT * FROM tags`, []);
        return tags;
    }

    static deleteSongTagBySongTagId = async (songTagId: number): Promise<number> => {
        const result: any = await asyncQuery<void>(`DELETE FROM song_tags WHERE songTagId=?`, [songTagId]);
        if (result.affectedRows) {
            return songTagId;
        }
        else {
            throw `Could not DELETE ${songTagId}`;
        }
    }

}

export default TagsRepository;