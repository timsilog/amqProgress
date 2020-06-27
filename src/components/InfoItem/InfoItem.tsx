import React from 'react';
import { Progress } from '../../types';
import './InfoItem.scss';

type InfoItemProps = {
  src: Progress | null,
}

const InfoItem = (props: InfoItemProps) => {
  if (!props.src) {
    return <div></div>
  }
  console.log(new Date(props.src.lastSeen).toDateString())
  let timeStr;
  let time = (Date.now() - props.src.lastSeen) / 1000; // to seconds
  if (time > 60 * 60 * 24) {
    time = time / 60 / 60 / 24; // to days
    timeStr = `${Math.floor(time)} day${time >= 2 ? 's' : ''} ago`;
  } else if (time > 60 * 60) {
    time = time / 60 / 60; // to hours
    timeStr = `${Math.floor(time)} hour${time >= 2 ? 's' : ''} ago`;
  } else if (time > 60) {
    time = time / 60; // to mins
    timeStr = `${Math.floor(time)} minute${time >= 2 ? 's' : ''} ago`;
  } else {
    timeStr = 'Just Now'
  }

  return (
    <div id='info-item-container'>
      <div id='last-seen'>{timeStr}</div>
      <div className='info-grid'>
        <div className='gray'>Title:</div>
        <div>{props.src.song[0].songName}</div>
        <div className='gray'>Artist:</div>
        <div>{props.src.song[0].songArtist}</div>
        <div className='gray'>Type:</div>
        <div>{props.src.song[0].songType}</div>
      </div>
      <div className='gray'>Anime:</div>
      <div className='info-grid smaller-indented'>
        <div className='gray'>English:</div>
        <div>{props.src.song[0].anime.english}</div>
        <div className='gray'>Romaji:</div>
        <div>{props.src.song[0].anime.romaji}</div>
        <div className='gray'>Native:</div>
        <div>{props.src.song[0].anime.native}</div>
      </div>
      {props.src.incorrectGuesses && Object.keys(props.src.incorrectGuesses).length ?
        <div>
          <div className='gray'>Incorrect Guesses:</div>
          <div className='smaller-indented info-grid'>
            <div className='guess-count'>Count</div>
            <div>Guess</div>
            {Object.values(props.src.incorrectGuesses).map(guess => [<div className='guess-count' key={`${guess.count}${guess.guess}`}>{guess.count}</div>, <div key={guess.guess}>{guess.guess}</div>])}
          </div>
        </div>
        : <div />}
      <br />
      {props.src.correctGuesses && Object.keys(props.src.correctGuesses).length ?
        <div>
          <div className='gray'>Correct Guesses:</div>
          <div className='smaller-indented info-grid'>
            <div className='guess-count'>Count</div>
            <div>Guess</div>
            {Object.values(props.src.correctGuesses).map(guess => [<div className='guess-count' key={`${guess.count}${guess.guess}`}>{guess.count}</div>, <div key={guess.guess}>{guess.guess}</div>])}
          </div>
        </div>
        : <div />}
      <br />
      {/* {props.src.incorrectGuessesOld && props.src.incorrectGuessesOld.length ?
        <div>
          <div className='gray'>Old Incorrect Guesses:</div>
          <div className='smaller-indented'>
            {props.src.incorrectGuessesOld.map(str => <div key={str}>{str}</div>)}
          </div>
        </div>
        : <div />}
      <br />
      {props.src.correctGuessesOld && props.src.correctGuessesOld.length ?
        <div>
          <div className='gray'>Old Correct Guesses</div>
          <div className='smaller-indented'>
            {props.src.correctGuessesOld.map(str => <div key={str}>{str}</div>)}
          </div>
        </div>
      : <div />}*/}
    </div>
  )
}

export default InfoItem;