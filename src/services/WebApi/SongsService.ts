import WebConstants from '../../constants/WebConstants';
import SongModel from '../../web/models/SongModel';
import TagModel from '../../web/models/TagModel';
import SongTagModel from '../../web/models/SongTagModel';

export default class SongsService {

    static addSongTag = async (songId: number, tag: TagModel | string): Promise<SongTagModel> => {
        const response = await fetch(`${WebConstants.API_URL}/songs/${songId}/tags`, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'POST',
            cache: 'no-cache',
            body: JSON.stringify({
                tag,
            }),
        });
        return response.json();
    }

    static getSongs = async (): Promise<SongModel[]> => {
        const response = await fetch(`${WebConstants.API_URL}/songs`)
        return response.json();
    }

    static getSongTagsBySongId = async (songId: number): Promise<SongTagModel[]> => {
        const response = await fetch(`${WebConstants.API_URL}/songs/${songId}/tags`)
        return response.json();
    }

    static putSong = async (song: SongModel): Promise<SongModel> => {
        const response = await fetch(`${WebConstants.API_URL}/songs/${song.songId}`, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'PUT',
            body: JSON.stringify({
                song
            }),
        })
        return response.json();
    }

    static postPlay = async (songId: number): Promise<void> => {
        await fetch(`${WebConstants.API_URL}/songs/${songId}/play`, {
            method: 'POST',
            cache: 'no-cache',
        });
        return;
    }

}