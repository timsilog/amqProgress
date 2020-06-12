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
  return (
    <div id='info-item-container'>
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
      <div className='gray'>Incorrect Guesses:</div>
      <div className='smaller-indented'>
        {props.src.incorrectGuesses.map(str => <div>{str}</div>)}
      </div>
      <br />
      <div className='gray'>Correct Guesses</div>
      <div className='smaller-indented'>
        {props.src.correctGuesses.map(str => <div>{str}</div>)}
      </div>
    </div>
  )
}

export default InfoItem;