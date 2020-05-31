import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import ProgressItem from '../ProgressItem/ProgressItem';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Loader from 'react-loader-spinner'
import './UserPage.scss'

const url = `https://serene-temple-88689.herokuapp.com`
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
const byArtist = (a, b) => a.song[0].songArtist > b.song[0].songArtist ? 1 : -1;
const byTitle = (a, b) => a.song[0].songName > b.song[0].songName ? 1 : -1;
const byLastSeen = (a, b) => a.lastSeen > b.lastSeen ? -1 : 1;
const byAnimeEn = (a, b) => {
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
  return a1 > b1 ? 1 : -1;
}
const byAnimeJp = (a, b) => {
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
  const [numSongs, setNumSongs] = useState(0);
  const [user, setUser] = useState('Loading...');
  const [progress, setProgress] = useState([]);
  const [currentDisplay, setCurrentDisplay] = useState({});
  const [loadingState, setLoadingState] = useState('unloaded');
  const [sortFun, setSortFun] = useState('1');
  const history = useHistory();

  useEffect(() => {
    // const unlisten = history.listen((location, action) => {
    //   console.log(action);
    //   if (action === 'PUSH' || 'POP') {
    //     setProgress([]);
    //   }
    // });
    const getUser = async () => {
      const dbUser = (await (await fetch(`${url}/users?username=${match.params.username}`)).json()).users[0];
      if (dbUser) {
        setUser(dbUser.displayName);
      }
    }
    const getProgress = async () => {
      let response = await fetch(`${url}/progress?username=${match.params.username.toLowerCase()}`);
      let currentProgress = (await response.json()).progress;
      if (!currentProgress || !currentProgress.paginatedResults.length) {
        return;
      }
      setCurrentDisplay(currentProgress.paginatedResults[0].song[0]);
      setLoadingState('loading');
      let offset = 500;
      const updateProgress = prev => {
        const latest = [...prev, ...currentProgress.paginatedResults];
        latest.sort(sortFuns[sortFun]);
        return latest;
      }
      if (currentProgress) {
        setNumSongs(currentProgress.totalCount[0].count);
      }
      while (currentProgress && currentProgress.paginatedResults.length > 0) {
        setProgress(updateProgress);
        response = await fetch(`${url}/progress?username=${match.params.username}&offset=${offset}`);
        currentProgress = (await response.json()).progress;
        offset += 500;
      }
      setLoadingState('loaded');
    }
    if (loadingState === 'unloaded') {
      getUser();
      getProgress();
    }
    // return () => {
    //   unlisten();
    // }
  }, [match, history, sortFun, loadingState]);

  const handleClick = i => {
    setCurrentDisplay(progress[i].song[0]);
  }

  const handleRadio = e => {
    setSortFun(e.target.value);
    const temp = progress;
    temp.sort(sortFuns[e.target.value]);
    setProgress(temp);
  }

  if (loadingState === 'loading' || loadingState === 'loaded') {
    return (
      <div id='user-page'>
        <h1>{user}</h1>
        <h3>Number of Songs Encountered: {numSongs}</h3>
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
              {loadingState === 'loaded' ? 'Filter' : <div id='filter-loading'><Loader type="Hearts" color="#E06E77" height={30} width={30} className='small-hearts' />Loading Songs ({progress.length}/{numSongs})</div>}
              <div className='line'></div>
              <label><input type="radio" id="by-most-seen" name='filter-by' value="1" checked={sortFun === '1'} onChange={handleRadio} disabled={loadingState === 'loaded' ? false : true} />By Most Seen</label>
              <label><input type="radio" id="by-most-missed" name='filter-by' value="2" checked={sortFun === '2'} onChange={handleRadio} disabled={loadingState === 'loaded' ? false : true} />By Most Missed</label>
              <label><input type="radio" id="by-most-hit" name='filter-by' value="3" checked={sortFun === '3'} onChange={handleRadio} disabled={loadingState === 'loaded' ? false : true} />By Most Accurate</label>
              <label><input type="radio" id="by-artist" name='filter-by' value="4" checked={sortFun === '4'} onChange={handleRadio} disabled={loadingState === 'loaded' ? false : true} />By Artist</label>
              <label><input type="radio" id="by-title" name='filter-by' value="5" checked={sortFun === '5'} onChange={handleRadio} disabled={loadingState === 'loaded' ? false : true} />By Song Title</label>
              <label><input type="radio" id="by-last-seen" name='filter-by' value="6" checked={sortFun === '6'} onChange={handleRadio} disabled={loadingState === 'loaded' ? false : true} />By Last Seen</label>
              <label><input type="radio" id="by-anime-en" name='filter-by' value="7" checked={sortFun === '7'} onChange={handleRadio} disabled={loadingState === 'loaded' ? false : true} />By Anime [English]</label>
              <label><input type="radio" id="by-anime-jp" name='filter-by' value="8" checked={sortFun === '8'} onChange={handleRadio} disabled={loadingState === 'loaded' ? false : true} />By Anime [Romaji]</label>
            </div>
            <br />
            <VideoPlayer src={currentDisplay ? currentDisplay : {}} />
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div id='loader'>
        <Loader type="Hearts" color="#E06E77" height={100} width={100} />
          Getting Songs...
      </div>
    )
  }
}

export default withRouter(UserPage);