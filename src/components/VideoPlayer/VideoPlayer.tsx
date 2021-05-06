import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Song, Media } from '../../types';
import './VideoPlayer.scss';
import { AppState } from '../../reducers';

type VideoProps = {
  media: Media,
  // src: Song | null,
  auto?: boolean
}

const shortenType = (type: string) => {
  return type.replace('Opening', 'OP').replace('Ending', 'ED').replace('Insert Song', 'IN');
}

const sortByVideoFirst = (a: string, b: string) =>
  a.includes('.webm') ? -1 : 1;

const VideoPlayer = (props: VideoProps) => {
  // const [srcs, setSrcs] = useState(null);
  const [current, setCurrent] = useState<string | null>(null);
  const vidRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (props.media.currentSong && props.media.currentSong.songLink.length) {
      setCurrent(props.media.currentSong.songLink[0]);
    }
  }, [props.media]);

  console.log(props.media.currentSong?.songLink);
  return (
    props.media.currentSong
      ?
      <div id='videoplayer'>
        <video
          controls
          key={props.media.currentSong._id}
          className={current && current.includes('.mp3') ? 'audio' : ''}
          ref={vidRef}
          autoPlay={props.auto}
        >
          {props.media.currentSong.songLink.sort(sortByVideoFirst).map((link, i) =>
            <source src={link} key={i}></source>)}
          No video
        </video>
        <div id="video-info">
          <div id='song-title'>{props.media.currentSong.songName}</div>
          <div id="video-sub-info">
            <div>{props.media.currentSong.songArtist}</div>
            <div>{`${props.media.currentSong.anime.english ? props.media.currentSong.anime.english : props.media.currentSong.anime.romaji} [${shortenType(props.media.currentSong.songType)}]`}</div>
          </div>
        </div>
      </div>
      : <video controls>
        No Video
      </video>
  )
}

const mapStateToProps = (state: AppState) => ({
  media: state.media
})

export default connect(mapStateToProps, {})(VideoPlayer);