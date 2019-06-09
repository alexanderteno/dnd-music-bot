import React, { Component } from 'react';
import Container from '../../General/Container';
import Icon from '../../General/Icon';
import SongsService from '../../../../services/WebApi/SongsService';
import PlayerService from '../../../../services/WebApi/PlayerService';
import SongModel from '../../../models/SongModel';
import { debounce } from 'lodash';
import SongTags from './SongTags';
import './Song.scss';
import TagModel from '../../../models/TagModel';
import TagService from '../../../../services/WebApi/TagService';
import SongTagModel from '../../../models/SongTagModel';

const WAIT_TIME = 1000;

interface SongProps extends SongModel {
  updateSong: (song: SongModel) => void;
}

class Song extends Component<SongProps> {

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

  handleDeleteTag = (songTag: SongTagModel, onSuccess?: (response?: any) => void, onError?: (err: Error) => void) => {
    TagService.deleteSongTag(songTag.songTagId)
      .then((returnId) => {
        if (onSuccess) {
          onSuccess(returnId);
        }
      })
      .catch((err) => {
        if (onError) {
          onError(err);
        }
      })
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
          <h2>Details</h2>
          <div className="controls">
            <label className="input-label">Duration:</label>
            <div className="input-control">TODO</div>
            <label className="input-label">BPM:</label>
            <div className="input-control">TODO</div>
            <label className="input-label">Visualization:</label>
            <div className="input-control">TODO</div>
            <SongTags songId={this.props.songId} handleDeleteTag={this.handleDeleteTag} />
          </div>
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