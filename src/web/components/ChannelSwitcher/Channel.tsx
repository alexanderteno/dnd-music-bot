import React from 'react';
import Icon from '../General/Icon';
import ChannelModel from '../../models/ChannelModel';
import './Channel.scss';

const CHANNEL_TYPES = {
    TEXT: 'text',
    VOICE: 'voice',
}

const GetChannelTypeLigature = (type: string): string => {
    switch (type) {
        case CHANNEL_TYPES.TEXT:
            return 'keyboard';
        case CHANNEL_TYPES.VOICE:
            return 'mic';
        default:
            return 'error_outline';
    }
}

interface ChannelProps extends ChannelModel {
    activeChannel?: string;
    joinChannel: (channelId: string) => void;
}

const Channel = (props: ChannelProps) => {

    const className = ['channel'];
    if (props.type === CHANNEL_TYPES.TEXT) {
        className.push('disabled');
    }

    const onClick = props.type === CHANNEL_TYPES.VOICE ?
        () => { props.joinChannel(props.id) } : undefined;

    return (
        <div className={className.join(' ')} onClick={onClick}>
            {(props.activeChannel === props.id) && (<Icon className="active">headset_mic</Icon>)}
            <div className="channel-title">{props.name}</div>
            <Icon className="type">{GetChannelTypeLigature(props.type as string)}</Icon>
        </div>
    )
}

export default Channel;