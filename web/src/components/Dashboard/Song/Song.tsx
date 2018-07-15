import * as React from 'react';
import './Song.scss';
import SongHelper from '../../Utilities/SongHelper';

interface SongProps {
  name: string,
  length: number,
  bpm?: number,
  ext?: string
}

class Song extends React.Component<SongProps> {

  render() {

    return (
      <div className="song card">
        <div className="header">
          <div className="title">
            <div className="name">
              {this.props.name}
            </div>
            {!!this.props.ext && (<div className="ext">{this.props.ext}</div>)}
          </div>
          <div className="icon material-icons">music_note</div>
        </div>
        <div className="content">
          <div className="label">Tags</div>
          <div className="label">Length: {SongHelper.formatDuration(this.props.length)}</div>
        </div>
      </div>
    );

  }

}

export default Song;