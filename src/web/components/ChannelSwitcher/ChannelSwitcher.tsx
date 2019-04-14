import React, { Component } from 'react';
import ChannelModel from '../../models/ChannelModel';
import ChannelService from '../../../services/WebApi/ChannelService';
import Channel from './Channel';
import Container from '../General/Container';
import './ChannelSwitcher.scss';

interface ChannelSwitcherState {
    channels: ChannelModel[] | undefined;
    activeChannel?: string;
}

export default class ChannelSwitcher extends Component<{}, ChannelSwitcherState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            channels: undefined,
        }
    }

    componentDidMount() {
        ChannelService.getChannels()
            .then((channels: ChannelModel[]) => {
                this.setState({ channels });
            });
        ChannelService.getActiveChannel()
            .then((channel: ChannelModel) => {
                this.setState({ activeChannel: channel.id })
            });
    }

    joinChannel = (channelId: string) => {
        ChannelService.join(channelId)
            .then(response => {
                if (response.status === 'joined') {
                    this.setState({ activeChannel: response.id })
                }
            })
    }

    getSortedChannels = (): ChannelModel[] => {
        this.state.channels.sort((a: ChannelModel, b: ChannelModel) => {
            if (a.type !== b.type) {
                return a.type === 'voice' ? -1 : 1;
            } else {
                return a.id < b.id ? -1 : 1
            }
        })
        return this.state.channels;
    }

    render() {

        return (
            <Container
                className="channel-switcher"
                title="Channels"
                collapsible={true}
                iconLigature="web"
                loading={this.state.channels === undefined}
            >
                <div className="channels">
                    {
                        this.state.channels && this.getSortedChannels().map((channel: ChannelModel) => (
                            <Channel
                                key={channel.id}
                                {...channel}
                                activeChannel={this.state.activeChannel}
                                joinChannel={this.joinChannel}
                            />
                        ))
                    }
                </div>
            </Container>
        )
    }

}