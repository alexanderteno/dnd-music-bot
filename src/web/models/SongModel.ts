import TagModel from "./TagModel";

interface SongModel {
    songId: number;
    songName: string;
    signature: string;
    songData?: Buffer;
    tags?: TagModel[];
}
export default SongModel;