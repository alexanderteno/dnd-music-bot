import React, { Component } from 'react';
import Loading from '../General/Loading';
import TagService from '../../../services/WebApi/TagService';
import PlaylistModel from '../../models/PlaylistModel';

interface PlaylistsState {
    playlists?: PlaylistModel[];
}

export default class Playlists extends Component<{}, PlaylistsState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            playlists: undefined,
        }
    }

    componentDidMount() {
        TagService.getPlaylists()
            .then((playlists) => {
                this.setState({ playlists });
            })
    }

    render() {
        return (
            <div className="playlists">
                {(!this.state.playlists && (<Loading />))}
            </div>
        )
    }

}