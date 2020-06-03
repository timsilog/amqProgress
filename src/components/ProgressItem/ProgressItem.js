import React from 'react';
import './ProgressItem.scss'
import playBtn from './play.png';

/* SAMPLE PROPS
{
  item: {
    "_id": "5ec96becffc2540017cc83b1",
    "correctGuesses": [],
    "incorrectGuesses": [
      "Tantei Opera Milky Holmes"
    ],
    "lastSeen": 1590258668274,
    "userId": "5ec425e323de9500176c814e",
    "songId": "5ec96becffc2540017cc83af",
    "hits": 0,
    "misses": 1,
    "__v": 0,
    "song": [
      {
        "_id": "5ec96becffc2540017cc83af",
        "songLink": [
          "https://files.catbox.moe/u1szbl.mp3"
        ],
        "uid": "dc1566a4bc7ea295fa5ae9c0e3d2398f6f9021ef",
        "songName": "Buddy Buddy Fight!",
        "anime": {
          "english": null,
          "romaji": "Future Card Buddyfight",
          "native": "フューチャーカード バディファイト"
        },
        "songArtist": "Sora Tokui",
        "songType": "Ending 1",
        "__v": 3
      }
    ]
  },
}
*/

const ProgressItem = (props) => {
  const getAnimeTitle = anime => {
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
    <div className='progress-item-container' >
      <div className='song-name'>{props.item.song[0].songName}</div>
      <div>{props.item.song[0].songArtist}</div>
      <div>{getAnimeTitle(props.item.song[0].anime)}</div>
      <div className='accuracy'>{`${props.item.hits}/${props.item.hits + props.item.misses}`}</div>
      <img src={playBtn} className='play-button' alt='play' onClick={props.onClick} />
    </div>
  )
}

export default ProgressItem;