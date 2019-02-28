import React from 'react';
import Icon from '../General/Icon';
import ChannelModel from '../../models/ChannelModel';
import './Channel.scss';

const GetChannelTypeLigature = (type: string): string => {
    switch (type) {
        case 'text':
            return 'keyboard';
        case 'voice':
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
    return (
        <div className="channel" onClick={() => { props.joinChannel(props.id) }}>
            {(props.activeChannel === props.id) && (<Icon className="active">headset_mic</Icon>)}
            <div className="channel-title">{props.name}</div>
            <Icon className="type">{GetChannelTypeLigature(props.type as string)}</Icon>
        </div>
    )
}

export default Channel;