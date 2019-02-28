interface SongModel {
    songId: number;
    songName: string;
    signature: string;
    songData?: Buffer;
}
export default SongModel;