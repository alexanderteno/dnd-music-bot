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

    static getStatus = async (): Promise<any> => {
        return fetch(`${WebConstants.API_URL}/player/status`)
            .then((response) => {
                return response.json();
            });
    }

}