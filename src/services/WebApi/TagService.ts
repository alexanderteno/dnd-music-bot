import WebConstants from "../../constants/WebConstants";
import TagModel from "../../web/models/TagModel";
import PlaylistModel from "../../web/models/PlaylistModel";

export default class TagService {

    static getTags = (): Promise<TagModel[]> => {
        return fetch(`${WebConstants.API_URL}/tags`)
            .then((response) => {
                return response.json();
            })
    }

    static deleteSongTag = (songTagId: number): Promise<number> => {
        return fetch(
            `${WebConstants.API_URL}/songTags/${songTagId}`,
            {
                method: 'DELETE',
            }
        )
            .then((response) => {
                return response.json();
            });
    }

    static getPlaylists = async (): Promise<PlaylistModel[]> => {
        return fetch(
            `${WebConstants.API_URL}/playlists`,
        )
            .then((response) => {
                return response.json();
            });
    }

}