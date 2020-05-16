import React from 'react';
import './VideoPlayer.scss';

const VideoPlayer = (props) => {
  return (
    props.src
      ? <div id='videoplayer'>
        {console.log(props.src ? props.src.songId.songLink : '')}
        <h3>{props.src.songId.songName}</h3>
        <div>{props.src.songId.anime.english}</div>
        <video controls key={props.src._id}>
          {props.src.songId.songLink.map((src, i) => <source src={src} key={i}></source>)}
        No video
      </video>
      </div>
      : <video controls>
        No Video
      </video>


  )
}

export default VideoPlayer;