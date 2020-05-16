import React from 'react';
import './ProgressItem.scss'

/* SAMPLE PROPS
  item: {
    "correctGuesses":["Steins;Gate 0"],
    "incorrectGuesses":[],
    "_id":"5ebb9917e6cbfb897766ef5b",
    "userId":"5ebb943a5366b187adf66118",
    "songId":{
      "anime":{
        "english":"Steins;Gate",
        "romaji":"Steins;Gate",
        "native":"シュタインズ・ゲート"
      },
      "songLink":["https://files.catbox.moe/akg1vv.webm"],
      "_id":"5ebb9917e6cbfb897766ef5a",
      "songName":"Sky Clad no Kansokusha",
      "songType":"Ending 2",
      "__v":0
    },
    "hits":1,
    "misses":0,
    "__v":0
  }
*/

const ProgressItem = (props) => {
  return (
    <div className='progress-item-container' onClick={props.onClick}>
      <div></div>
      <div className='song-name'>{props.item.songId.songName}</div>
      {/* <div className='anime-container'> */}
      <div>{props.item.songId.anime.english}</div>
      {/* <div>{props.item.songId.anime.romaji}</div> */}
      {/* <div>{props.item.songId.anime.native}</div> */}
      {/* </div> */}
      <div className='song-type'>{props.item.songId.songType}</div>
      <div className='accuracy'>{`${props.item.hits}/${props.item.hits + props.item.misses}`}</div>
    </div>
  )
}

export default ProgressItem;