import React, { Component } from 'react';
import ChannelModel from '../../models/ChannelModel';
import Loading from '../General/Loading';
import './ChannelSwitcher.scss';
import Icon from '../General/Icon';
import ChannelService from '../../../services/WebApi/ChannelService';
import Channel from './Channel';

interface ChannelSwitcherState {
    collapsed: boolean;
    channels: ChannelModel[] | undefined;
    activeChannel?: string;
}

export default class ChannelSwitcher extends Component<{}, ChannelSwitcherState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            collapsed: true,
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

    private joinChannel = (channelId: string) => {
        ChannelService.join(channelId)
            .then(response => {
                if (response.status === 'joined') {
                    this.setState({ activeChannel: response.id })
                }
            })
    }

    private toggleCollapse = () => {
        this.setState((prevState) => ({
            ...prevState,
            collapsed: !prevState.collapsed,
        }))
    }

    render() {
        return (
            <div className="channel-switcher">
                <div className="header" onClick={this.toggleCollapse}>
                    <Icon>{this.state.collapsed ? 'expand_more' : 'expand_less'}</Icon>
                    <div className="title">Channels</div>
                    <Icon>web</Icon>
                </div>
                {!this.state.collapsed && (<div className="content">
                    {
                        this.state.channels ? (
                            <div className="channels">
                                {
                                    this.state.channels.map((channel: ChannelModel) => (
                                        <Channel
                                            key={channel.id}
                                            {...channel}
                                            activeChannel={this.state.activeChannel}
                                            joinChannel={this.joinChannel}
                                        />
                                    ))
                                }
                            </div>
                        ) : (<Loading />)}
                </div>)}
            </div>
        )
    }

}