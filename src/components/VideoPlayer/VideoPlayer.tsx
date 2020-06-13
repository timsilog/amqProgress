import React, { useState, useEffect, useRef } from 'react';
import { Song } from '../../types';
import './VideoPlayer.scss';

type VideoProps = {
  src: Song | null,
  auto: boolean
}

const shortenType = (type: string) => {
  return type.replace('Opening', 'OP').replace('Ending', 'ED').replace('Insert Song', 'IN');
}

const VideoPlayer = (props: VideoProps) => {
  // const [srcs, setSrcs] = useState(null);
  const [current, setCurrent] = useState<string | null>(null);
  const vidRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // setSrcs(props.src.songLink);
    if (props.src && props.src.songLink.length) {
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
          autoPlay={props.auto}
        >
          <source src={current ? current : ''}></source>
          No video
        </video>
        <div id="video-info">
          <h2>{props.src.songName}</h2>
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