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
          {props.src.songId.songLink.map((src, i) => <source src={src} key={i}></source>)}
          No video
        </video>
        <div id="video-info">
          <h3>{props.src.songId.songName}</h3>
          <div id="video-sub-info">
            <div>{props.src.songId.songArtist}</div>
            <div>{`${props.src.songId.anime.english} [${shortenType(props.src.songId.songType)}]`}</div>
          </div>
        </div>
      </div>
      : <video controls>
        No Video
      </video>


  )
}

export default VideoPlayer;