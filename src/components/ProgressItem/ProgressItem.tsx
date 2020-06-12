import React from 'react';
import { Progress } from '../../types';
import './ProgressItem.scss'
import playBtn from './play.png';

type ProgressItemProps = {
  item: Progress,
  isEnglish: boolean,
  onClick: () => void,
  onClickPlay: () => void
}

type SongAnime = {
  english: string | null,
  romaji: string | null,
  native: string | null,
  amq1: string | null,
  amq2: string | null,
}

const ProgressItem = (props: ProgressItemProps) => {
  const getAnimeTitle = (anime: SongAnime) => {
    if (props.isEnglish) {
      return anime.english
        ? anime.english
        : anime.romaji
          ? anime.romaji
          : anime.native;
    } else {
      return anime.romaji
        ? anime.romaji
        : anime.english
          ? anime.english
          : anime.native;
    }
  }

  return (
    <div className={`progress-item-container`} onClick={props.onClick}>
      <div className='song-name'>{props.item.song[0].songName}</div>
      <div>{props.item.song[0].songArtist}</div>
      <div>{getAnimeTitle(props.item.song[0].anime)}</div>
      <div className='accuracy'>{`${props.item.hits}/${props.item.hits + props.item.misses}`}</div>
      <img src={playBtn} className='play-button' alt='play' onClick={props.onClickPlay} />
    </div>
  )
}

export default ProgressItem;