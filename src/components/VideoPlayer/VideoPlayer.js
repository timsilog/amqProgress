import React, { useState, useEffect, useRef } from 'react';
import './VideoPlayer.scss';

const shortenType = (type) => {
  return type.replace('Opening', 'OP').replace('Ending', 'ED').replace('Insert Song', 'IN');
}

const VideoPlayer = (props) => {
  // const [srcs, setSrcs] = useState(null);
  const [current, setCurrent] = useState(null);
  const vidRef = useRef();

  useEffect(() => {
    // setSrcs(props.src.songLink);
    if (props.src.songLink.length) {
      setCurrent(props.src.songLink[0]);
    }
  }, [props.src]);

  return (
    props.src
      ?
      <div id='videoplayer'>
        <video
          controls
          key={props.src._id}
          className={current && current.includes('.mp3') ? 'audio' : ''}
          ref={vidRef}
        >
          <source src={current}></source>
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