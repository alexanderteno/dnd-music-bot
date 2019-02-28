import WebConstants from '../../constants/WebConstants';
import SongModel from '../../web/models/SongModel';

export default class SongsService {

    static getSongs = async (): Promise<null | SongModel[]> => {
        return fetch(`${WebConstants.API_URL}/songs`)
            .then((response) => {
                return response.json();
            })
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