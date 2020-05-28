import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import ProgressItem from '../ProgressItem/ProgressItem';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import './UserPage.scss'

const url = `https://serene-temple-88689.herokuapp.com/progress`
const byMostSeen = (a, b) => {
  return a.hits + a.misses > b.hits + b.misses
    ? -1
    : a.hits + a.misses === b.hits + b.misses
      ? a.hits > b.hits ? -1 : 1
      : 1;
};
const byMostMissed = (a, b) => {
  return a.misses > b.misses
    ? -1
    : a.misses === b.misses
      ? a.hits + a.misses > b.hits + b.misses ? -1 : 1
      : 1;
}
const byMostHit = (a, b) => {
  return a.misses < b.misses
    ? -1
    : a.misses === b.misses
      ? a.hits + a.misses > b.hits + b.misses ? -1 : 1
      : 1;
}
const byArtist = (a, b) => a.songId.songArtist > b.songId.songArtist ? 1 : -1;
const byTitle = (a, b) => a.songId.songName > b.songId.songName ? 1 : -1;
const byLastSeen = (a, b) => a.lastSeen > b.lastSeen ? -1 : 1;
const byAnimeEn = (a, b) => {
  const a1 = a.songId.anime.english
    ? a.songId.anime.english
    : a.songId.anime.romaji
      ? a.songId.anime.romaji
      : a.songId.anime.amq1;
  const b1 = b.songId.anime.english
    ? b.songId.anime.english
    : b.songId.anime.romaji
      ? b.songId.anime.romaji
      : b.songId.anime.amq1;
  return a1 > b1 ? 1 : -1;
}
const byAnimeJp = (a, b) => {
  const a1 = a.songId.anime.romaji
    ? a.songId.anime.romaji
    : a.songId.anime.english
      ? a.songId.anime.english
      : a.songId.anime.amq1;
  const b1 = b.songId.anime.romaji
    ? b.songId.anime.romaji
    : b.songId.anime.english
      ? b.songId.anime.english
      : b.songId.anime.amq1;
  return a1 > b1 ? 1 : -1;
}
const sortFuns = {
  1: byMostSeen,
  2: byMostMissed,
  3: byMostHit,
  4: byArtist,
  5: byTitle,
  6: byLastSeen,
  7: byAnimeEn,
  8: byAnimeJp,
}

const UserPage = ({ match }) => {
  const [progress, setProgress] = useState([]);
  const [currentDisplay, setCurrentDisplay] = useState({});
  const [loadingState, setLoadingState] = useState('loading');
  const [sortFun, setSortFun] = useState('1');
  const history = useHistory();

  useEffect(() => {
    // const unlisten = history.listen((location, action) => {
    //   console.log(action);
    //   if (action === 'PUSH' || 'POP') {
    //     setProgress([]);
    //   }
    // });
    const getProgress = async () => {
      let response = await fetch(`${url}?username=${match.params.username.toLowerCase()}`);
      let currentProgress = (await response.json()).progress;
      if (!currentProgress || !currentProgress.length) {
        return;
      }
      setCurrentDisplay(currentProgress[0])
      setLoadingState('loaded');
      let offset = 50;
      const updateProgress = prev => {
        const latest = [...prev, ...currentProgress];
        latest.sort(sortFuns[sortFun]);
        return latest;
      }
      while (currentProgress && currentProgress.length > 0) {
        setProgress(updateProgress);
        response = await fetch(`${url}?username=${match.params.username}&offset=${offset}`);
        currentProgress = (await response.json()).progress;
        offset += 50;
      }

    }
    if (loadingState !== 'loaded') {
      getProgress();
    }
    // return () => {
    //   unlisten();
    // }
  }, [match, history, sortFun, loadingState]);

  const handleClick = i => {
    setCurrentDisplay(progress[i]);
  }

  const handleRadio = e => {
    setSortFun(e.target.value);
    const temp = progress;
    temp.sort(sortFuns[e.target.value]);
    setProgress(temp);
  }

  switch (loadingState) {
    case 'loaded':
      return (
        <div id='user-page'>
          <div>{match.params.username}</div>
          <div className='songs-container'>
            <div className='progress-item-list-container'>
              <div id='list-header'>
                <div>Title</div>
                <div>Artist</div>
                <div>Anime</div>
                <div>Hits</div>
              </div>
              {progress.map((item, i) => <ProgressItem
                item={item}
                key={item._id}
                onClick={() => handleClick(i)}
              />)}
            </div>
            <div id='right-fixed'>
              <div id='filter'>
                Filter
                <div className='line'></div>
                <label><input type="radio" id="by-most-seen" name='filter-by' value="1" checked={sortFun === '1'} onChange={handleRadio} />By Most Seen</label>
                <label><input type="radio" id="by-most-missed" name='filter-by' value="2" checked={sortFun === '2'} onChange={handleRadio} />By Most Missed</label>
                <label><input type="radio" id="by-most-hit" name='filter-by' value="3" checked={sortFun === '3'} onChange={handleRadio} />By Most Accurate</label>
                <label><input type="radio" id="by-artist" name='filter-by' value="4" checked={sortFun === '4'} onChange={handleRadio} />By Artist</label>
                <label><input type="radio" id="by-title" name='filter-by' value="5" checked={sortFun === '5'} onChange={handleRadio} />By Song Title</label>
                <label><input type="radio" id="by-last-seen" name='filter-by' value="6" checked={sortFun === '6'} onChange={handleRadio} />By Last Seen</label>
                <label><input type="radio" id="by-anime-en" name='filter-by' value="7" checked={sortFun === '7'} onChange={handleRadio} />By Anime [English]</label>
                <label><input type="radio" id="by-anime-jp" name='filter-by' value="8" checked={sortFun === '8'} onChange={handleRadio} />By Anime [Romaji]</label>
              </div>
              <br />
              <VideoPlayer src={currentDisplay ? currentDisplay : {}} />
            </div>
          </div>
        </div>
      )
    default:
      return <div id='user-page'>This user doesn't have any progress</div>
  }
}

export default withRouter(UserPage);