import React from 'react';
import Icon from '../../General/Icon';
import SongsService from '../../../../services/WebApi/SongsService';
import PlayerService from '../../../../services/WebApi/PlayerService';
import SongModel from '../../../models/SongModel';
import './Song.scss';

interface SongProps extends SongModel {
}

class Song extends React.Component<SongProps> {

  private handlePlayRequest = (_: React.SyntheticEvent) => {
    SongsService.postPlay(this.props.songId);
  }

  private handleStopRequest = () => {
    PlayerService.postStop();
  }

  render() {

    return (
      <div className="song">
        <div className="header">
          <div className="name" title={`Song Id: ${this.props.songId}`}>{this.props.songName}</div>
          <Icon>music_note</Icon>
        </div>
        <div className="details">
          <div className="title">Details:</div>
        </div>
        <div className="preview">
          <div className="title">Playback:</div>
          <Icon className="button" onClick={this.handlePlayRequest}>play_arrow</Icon>
          <Icon className="button" onClick={this.handleStopRequest}>stop</Icon>
        </div>
      </div>
    );

  }

}

export default Song;