import React, { Component } from 'react';
import Loading from '../General/Loading';
import SongsService from '../../../services/WebApi/SongsService';
import SongModel from '../../model/SongModel';
import Song from '../Dashboard/Song/Song';

interface SongState {
    songs?: SongModel[];
}

export default class Songs extends Component<{}, SongState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            songs: undefined,
        }
    }

    componentDidMount() {
        document.title = "Songs";
        SongsService.getSongs()
            .then((songs: SongModel[]) => {
                this.setState({ songs });
            })
    }

    render() {
        return (
            <div className="songs">
                {
                    this.state.songs ?
                        <>
                            {this.state.songs.map((song: SongModel) => (
                                <Song key={song.signature} {...song} />
                            ))}
                        </> :
                        (<Loading />)
                }
            </div>
        )
    }

}