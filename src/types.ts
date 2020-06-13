export interface Progress {
  _id: string,
  correctGuesses: {
    [key: string]: number,
  },
  incorrectGuesses: {
    [key: string]: number,
  },
  correctGuessesOld: string[],
  incorrectGuessesOld: string[],
  lastSeen: number,
  userId: string,
  songId: string,
  hits: number,
  misses: number,
  __v: number,
  song: Song[],
}

export interface Song {
  _id: string,
  songLink: Array<string>,
  uid: string,
  songName: string,
  anime: {
    english: string | null,
    romaji: string | null,
    native: string | null,
    amq1: string | null,
    amq2: string | null,
  },
  songArtist: string,
  songType: string,
  __v: number,
}

/* SAMPLE
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