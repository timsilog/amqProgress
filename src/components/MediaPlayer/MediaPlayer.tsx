import React from 'react';
import { connect } from 'react-redux';
import { Media } from '../../types';
import './MediaPlayer.scss';
import { AppState } from '../../reducers';
// also uses materialize css

interface MediaPlayerProps {
  media: Media,
}

const MediaPlayer = (props: MediaPlayerProps) => {

  if (props.media.currentSong) {
    return (
      <div id='mediaplayer-container'>
        hello world;
      </div>
    )
  } else {
    return null;
  }
}

const mapStateToProps = (state: AppState) => ({
  media: state.media
});

export default connect(mapStateToProps, {})(MediaPlayer);