import React from 'react';

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

const InfoItem = props => {
  return (
    <div id='info-item-container'>
      <div>{props.src.incorrectGuesses.join(', ')}</div>
    </div>
  )
}

export default InfoItem;