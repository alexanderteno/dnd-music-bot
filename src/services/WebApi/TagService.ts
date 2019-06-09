import WebConstants from "../../constants/WebConstants";
import TagModel from "../../web/models/TagModel";

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

}