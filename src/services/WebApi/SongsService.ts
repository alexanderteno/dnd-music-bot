import WebConstants from '../../constants/WebConstants';
import SongModel from '../../web/models/SongModel';

export default class SongsService {

    static getSongs = async (): Promise<null | SongModel[]> => {
        return fetch(`${WebConstants.API_URL}/songs`)
            .then((response) => {
                return response.json();
            })
    }

    static putSong = async (song: SongModel): Promise<null | SongModel> => {
        return fetch(`${WebConstants.API_URL}/songs/${song.songId}`, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'PUT',
            body: JSON.stringify({
                song
            }),
        })
            .then((response) => {
                return response.json();
            })
            .catch((err) => {
                throw err;
            });
    }

    static postPlay = async (songId: number): Promise<void> => {
        fetch(`${WebConstants.API_URL}/songs/${songId}/play`, {
            method: 'POST',
            cache: 'no-cache',
        })
            .then(() => {
                // Song Started
            })
            .catch((err) => {
                console.error(err);
            });
    }

}