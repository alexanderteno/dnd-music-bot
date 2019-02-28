import WebConstants from '../../constants/WebConstants';
import ChannelModel from '../../web/models/ChannelModel';

export default class ChannelService {

    static getChannels = async (): Promise<ChannelModel[]> => {
        return fetch(`${WebConstants.API_URL}/channels`)
            .then((response) => {
                return response.json();
            });
    }

    static getActiveChannel = async (): Promise<ChannelModel> => {
        return fetch(`${WebConstants.API_URL}/channels/active`)
            .then((response) => {
                return response.json();
            });
    }

    static join = async (channelId: string): Promise<{ id: string, status: string }> => {
        return fetch(`${WebConstants.API_URL}/channels/${channelId}/join`, {
            method: 'POST',
        })
            .then((response) => {
                return response.json();
            })
    }

}