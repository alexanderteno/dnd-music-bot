export default interface ChannelModel {
    type: 'text' | 'voice';
    id: string;
    name: string;
}