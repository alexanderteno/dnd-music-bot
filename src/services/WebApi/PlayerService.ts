import WebConstants from '../../constants/WebConstants';
import { Result } from 'range-parser';

export default class PlayerService {

    static postStop = async (): Promise<void> => {
        await fetch(`${WebConstants.API_URL}/player/stop`, {
            method: 'POST',
        })
        return;
    }

    static getVolume = async (): Promise<number | undefined> => {
        const response = await fetch(`${WebConstants.API_URL}/player/volume`);
        return response.json();
    }

    static setVolume = async (volume: number): Promise<number> => {
        const response = await fetch(`${WebConstants.API_URL}/player/volume`, {
            method: 'POST',
            body: JSON.stringify({ volume }),
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json",
            }
        })
        return response.json();
    }

    static getStatus = async (): Promise<any> => {
        return fetch(`${WebConstants.API_URL}/player/status`)
            .then((response) => {
                return response.json();
            });
    }

}