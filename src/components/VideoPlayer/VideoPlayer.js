import React from 'react';
import './VideoPlayer.scss';

const shortenType = (type) => {
  return type.replace('Opening', 'OP').replace('Ending', 'ED').replace('Insert', 'IN');
}

const VideoPlayer = (props) => {
  return (
    props.src
      ?
      <div id='videoplayer'>
        <video controls key={props.src._id}>
          {props.src.songLink.map((src, i) => <source src={src} key={i}></source>)}
          No video
        </video>
        <div id="video-info">
          <h3>{props.src.songName}</h3>
          <div id="video-sub-info">
            <div>{props.src.songArtist}</div>
            <div>{`${props.src.anime.english ? props.src.anime.english : props.src.anime.romaji} [${shortenType(props.src.songType)}]`}</div>
          </div>
        </div>
      </div>
      : <video controls>
        No Video
      </video>
  )
}

export default VideoPlayer;