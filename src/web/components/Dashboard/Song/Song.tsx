import React from 'react';
import Container from '../../General/Container';
import Icon from '../../General/Icon';
import SongsService from '../../../../services/WebApi/SongsService';
import PlayerService from '../../../../services/WebApi/PlayerService';
import SongModel from '../../../models/SongModel';
import { debounce } from 'lodash';
import './Song.scss';

const WAIT_TIME = 1000;

interface SongProps extends SongModel {
  updateSong: (song: SongModel) => void;
}

class Song extends React.Component<SongProps> {

  constructor(props: SongProps) {
    super(props);
    this.updateTitle = debounce(this.updateTitle, WAIT_TIME)
  }

  private handlePlayRequest = (_: React.SyntheticEvent) => {
    SongsService.postPlay(this.props.songId);
  }

  private handleStopRequest = () => {
    PlayerService.postStop();
  }

  private updateTitle = (songName: string) => {
    const songModel = {
      ...this.props,
      songName,
    }
    SongsService.putSong(songModel)
      .then((song: SongModel) => {
        this.props.updateSong(song);
      });
  }

  private handleTitleChange = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    this.updateTitle(e.currentTarget.innerText);
  }

  render() {

    return (
      <Container
        className="song"
        title={this.props.songName}
        iconLigature="music_note"
        handleTitleChange={this.handleTitleChange}
      >
        <div className="details">
          <div className="title">Details:</div>
        </div>
        <div className="preview">
          <div className="title">Playback:</div>
          <Icon className="button" onClick={this.handlePlayRequest}>play_arrow</Icon>
          <Icon className="button" onClick={this.handleStopRequest}>stop</Icon>
        </div>
      </Container>
    );

  }

}

export default Song;