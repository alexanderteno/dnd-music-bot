import React, { Component } from 'react';
import Loading from '../General/Loading';
import SongsService from '../../../services/WebApi/SongsService';
import Song from '../Dashboard/Song/Song';
import SongModel from '../../models/SongModel';
import { cloneDeep } from 'lodash'

interface SongsState {
    songs?: SongModel[];
}

export default class Songs extends Component<{}, SongsState> {

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
                            {
                                this.state.songs.map((song: SongModel, index: number) => {
                                    const updateSong = (song: SongModel) => {
                                        this.setState((prevState: SongsState) => {
                                            const nextSongs = cloneDeep(prevState.songs);
                                            nextSongs[index] = song;
                                            return {
                                                songs: nextSongs,
                                            };
                                        })
                                    }
                                    return (
                                        <Song
                                            key={song.signature}
                                            updateSong={updateSong}
                                            {...song}
                                        />
                                    )
                                })
                            }
                        </> :
                        (<Loading />)
                }
            </div>
        )
    }

}