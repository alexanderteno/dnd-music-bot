import WebConstants from '../../constants/WebConstants';

export default class PlayerService {

    static postStop = async (): Promise<void> => {
        fetch(`${WebConstants.API_URL}/player/stop`, {
            method: 'POST',
        })
            .then((result) => {
                console.log(result);
            });
    }

    static getVolume = async (): Promise<number | undefined> => {
        return fetch(`${WebConstants.API_URL}/player/volume`)
            .then((result) => {
                return result.json();
            })
            .then((responseBody: { volume: number | undefined }) => {
                return responseBody.volume;
            });
    }

    static setVolume = async (volume: number): Promise<number> => {

        return fetch(`${WebConstants.API_URL}/player/volume`, {
            method: 'POST',
            body: JSON.stringify({ volume }),
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((result) => {
                return result.json();
            })
            .then((responseBody: { volume: number }) => {
                return responseBody.volume;
            });
    }

    static getStatus = async (): Promise<any> => {
        return fetch(`${WebConstants.API_URL}/player/status`)
            .then((response) => {
                return response.json();
            });
    }

}