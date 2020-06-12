import { Progress } from '../../types';

let isReversed = false;

const byMostSeen = (a: Progress, b: Progress) => {
  const res = a.hits + a.misses > b.hits + b.misses
    ? -1
    : a.hits + a.misses === b.hits + b.misses
      ? a.hits > b.hits ? -1 : 1
      : 1;
  if (isReversed) {
    return res === 1 ? -1 : 1;
  }
  return res;
};
const byMostMissed = (a: Progress, b: Progress) => {
  const res = a.misses > b.misses
    ? -1
    : a.misses === b.misses
      ? a.hits + a.misses > b.hits + b.misses ? -1 : 1
      : 1;
  if (isReversed) {
    return res === 1 ? -1 : 1;
  }
  return res;
}
const byMostHit = (a: Progress, b: Progress) => {
  const res = a.misses < b.misses
    ? -1
    : a.misses === b.misses
      ? a.hits + a.misses > b.hits + b.misses ? -1 : 1
      : 1;
  if (isReversed) {
    return res === 1 ? -1 : 1;
  }
  return res;
}
const byArtist = (a: Progress, b: Progress) => {
  const res = a.song[0].songArtist > b.song[0].songArtist ? 1 : -1;
  if (isReversed) {
    return res === 1 ? -1 : 1;
  }
  return res;
}
const byTitle = (a: Progress, b: Progress) => {
  const res = a.song[0].songName > b.song[0].songName ? 1 : -1;
  if (isReversed) {
    return res === 1 ? -1 : 1;
  }
  return res;
}
const byLastSeen = (a: Progress, b: Progress) => {
  const res = a.lastSeen > b.lastSeen ? -1 : 1;
  if (isReversed) {
    return res === 1 ? -1 : 1;
  }
  return res;
}
const byAnimeEn = (a: Progress, b: Progress) => {
  const a1 = a.song[0].anime.english
    ? a.song[0].anime.english
    : a.song[0].anime.romaji
      ? a.song[0].anime.romaji
      : a.song[0].anime.amq1;
  const b1 = b.song[0].anime.english
    ? b.song[0].anime.english
    : b.song[0].anime.romaji
      ? b.song[0].anime.romaji
      : b.song[0].anime.amq1;
  if (!a1 || !b1) { return 1 }; // because possibly null
  const res = a1 > b1 ? 1 : -1;
  if (isReversed) {
    return res === 1 ? -1 : 1;
  }
  return res;
}
const byAnimeJp = (a: Progress, b: Progress) => {
  const a1 = a.song[0].anime.romaji
    ? a.song[0].anime.romaji
    : a.song[0].anime.english
      ? a.song[0].anime.english
      : a.song[0].anime.amq1;
  const b1 = b.song[0].anime.romaji
    ? b.song[0].anime.romaji
    : b.song[0].anime.english
      ? b.song[0].anime.english
      : b.song[0].anime.amq1;
  if (!a1 || !b1) { return 1 }; // because possibly null
  const res = a1 > b1 ? 1 : -1;
  if (isReversed) {
    return res === 1 ? -1 : 1;
  }
  return res;
}

const sortFuns: {
  [key: number]: (a: Progress, b: Progress) => number
} = {
  1: byMostSeen,
  2: byLastSeen,
  3: byMostMissed,
  4: byMostHit,
  5: byArtist,
  6: byTitle,
  7: byAnimeEn,
  8: byAnimeJp,
}

const sortSongs = (list: Progress[], sortFun: number, setReversed: boolean) => {
  if (setReversed) {
    isReversed = setReversed;
  }
  const temp = list;
  temp.sort(sortFuns[sortFun]);
  return temp;
}

export default sortSongs;