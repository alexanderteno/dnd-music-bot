import SongModel from "./SongModel";
import TagModel from "./TagModel";

interface SongTagModel extends SongModel, TagModel {
    songTagId: number;
}

export default SongTagModel;