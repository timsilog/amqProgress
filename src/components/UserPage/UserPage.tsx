import React, { useState, useEffect } from 'react';
import { withRouter, useHistory, RouteComponentProps } from 'react-router-dom';
import ProgressItem from '../ProgressItem/ProgressItem';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import InfoItem from '../InfoItem/InfoItem';
import Loader from 'react-loader-spinner';
import Toggle from 'react-toggle';
import sortSongs from './sortFunctions';
import { Progress } from '../../types';
import './UserPage.scss';
import './react-toggle.scss';

const OFFSET = 500;
const url = `https://serene-temple-88689.herokuapp.com`

type MatchParams = {
  username: string
}

const UserPage = ({ match }: RouteComponentProps<MatchParams>) => {
  const [numSongs, setNumSongs] = useState(0);
  const [user, setUser] = useState<string>('');
  const [progress, setProgress] = useState<Progress[]>([]);
  const [currentDisplay, setCurrentDisplay] = useState<Progress | null>(null);
  const [currentInfo, setCurrentInfo] = useState<Progress | null>(null);
  const [loadingState, setLoadingState] = useState('unloaded');
  const [sortFun, setSortFun] = useState(1);
  const [isEnglish, setIsEnglish] = useState(true);
  const [isReversed, setIsReversed] = useState(false);
  const [currentTab, setCurrentTab] = useState<'filter' | 'info' | 'queue'>('filter');
  const history = useHistory();

  useEffect(() => {
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
      setCurrentDisplay(currentProgress.paginatedResults[0]);
      setCurrentInfo(currentProgress.paginatedResults[0]);
      setLoadingState('loading');
      let offset = OFFSET;
      const updateProgress = (prev: Progress[]) => {
        let latest = [...prev, ...currentProgress.paginatedResults];
        latest = sortSongs(latest, sortFun, isReversed);
        return latest;
      }
      if (currentProgress) {
        setNumSongs(currentProgress.totalCount[0].count);
      }
      while (currentProgress && currentProgress.paginatedResults.length > 0) {
        setProgress(updateProgress);
        response = await fetch(`${url}/progress?username=${match.params.username}&offset=${offset}`);
        currentProgress = (await response.json()).progress;
        offset += OFFSET;
      }
      setLoadingState('loaded');
    }
    if (loadingState === 'unloaded') {
      getUser();
      getProgress();
    }
  }, [match, history, sortFun, loadingState, isReversed]);

  const handleCurrentDisplay = (i: number) => {
    setCurrentDisplay(progress[i]);
  }

  const handleCurrentInfo = (i: number) => {
    setCurrentInfo(progress[i]);
    setCurrentTab('info');
  }

  const handleLanguageToggle = () => {
    setIsEnglish(!isEnglish);
  }

  const handleReverseToggle = () => {
    setIsReversed(!isReversed);
    const temp = progress;
    temp.reverse();
    setProgress(temp);
  }

  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '7') {
      setIsEnglish(true);
    } else if (e.target.value === '8') {
      setIsEnglish(false);
    }
    setSortFun(parseInt(e.target.value));
    setProgress(sortSongs(progress, parseInt(e.target.value), isReversed));
  }

  if (loadingState === 'loading' || loadingState === 'loaded') {
    return (
      <div id='user-page'>
        <h1 className='indent'>{user}</h1>
        <h3 className='indent'>Number of Songs Encountered: {numSongs}</h3>
        <div className='songs-container'>
          <div className='progress-item-list-container'>
            <div id='list-header'>
              <div>Title</div>
              <div>Artist</div>
              <div>Anime</div>
              <div>Hits</div>
              <div />
            </div>
            {progress.map((item, i) => <ProgressItem
              item={item}
              key={item._id}
              onClick={() => handleCurrentInfo(i)}
              onClickPlay={() => handleCurrentDisplay(i)}
              isEnglish={isEnglish}
            />)}
          </div>
          <div id='right-fixed'>
            <VideoPlayer src={currentDisplay ? currentDisplay.song[0] : null} />
            <br />
            <div id='toolbox'>
              <div id='toolbox-content'>
                {
                  currentTab === 'info' ?
                    <InfoItem src={currentInfo ? currentInfo : null} />
                    : currentTab === 'queue' ?
                      <div>Coming Soon</div>
                      :
                      <div id='filter'>
                        {loadingState === 'loaded'
                          ? <div id='filter-header' className='loaded'>Filter</div>
                          : <div id='filter-header'><Loader type="Hearts" color="#E06E77" height={50} width={50} />Loading Songs ({progress.length}/{numSongs})</div>}
                        <div className='line'></div>
                        <div id='filter-grid'>
                          <label><Toggle
                            icons={{
                              checked: <b className='toggle-icon'>R</b>,
                              unchecked: <b className='toggle-icon'>E</b>
                            }}
                            checked={!isEnglish}
                            disabled={loadingState === 'loaded' ? false : true}
                            onChange={handleLanguageToggle}
                          />English/Romaji</label>
                          <label><Toggle
                            checked={isReversed}
                            disabled={loadingState === 'loaded' ? false : true}
                            onChange={handleReverseToggle}
                          />Reverse</label>
                          <label><input type="radio" id="by-most-seen" name='filter-by' value="1" checked={sortFun === 1} onChange={handleRadio} disabled={loadingState === 'loaded' ? false : true} />By Most Seen</label>
                          <label><input type="radio" id="by-last-seen" name='filter-by' value="2" checked={sortFun === 2} onChange={handleRadio} disabled={loadingState === 'loaded' ? false : true} />By Last Seen</label>
                          <label><input type="radio" id="by-most-missed" name='filter-by' value="3" checked={sortFun === 3} onChange={handleRadio} disabled={loadingState === 'loaded' ? false : true} />By Most Missed</label>
                          <label><input type="radio" id="by-most-hit" name='filter-by' value="4" checked={sortFun === 4} onChange={handleRadio} disabled={loadingState === 'loaded' ? false : true} />By Most Accurate</label>
                          <label><input type="radio" id="by-artist" name='filter-by' value="5" checked={sortFun === 5} onChange={handleRadio} disabled={loadingState === 'loaded' ? false : true} />By Artist</label>
                          <label><input type="radio" id="by-title" name='filter-by' value="6" checked={sortFun === 6} onChange={handleRadio} disabled={loadingState === 'loaded' ? false : true} />By Song Title</label>
                          <label><input type="radio" id="by-anime-en" name='filter-by' value="7" checked={sortFun === 7} onChange={handleRadio} disabled={loadingState === 'loaded' ? false : true} />By Anime [English]</label>
                          <label><input type="radio" id="by-anime-jp" name='filter-by' value="8" checked={sortFun === 8} onChange={handleRadio} disabled={loadingState === 'loaded' ? false : true} />By Anime [Romaji]</label>
                        </div>
                      </div>
                }
              </div>
              <div id='toolbox-tabs'>
                <div className={currentTab === 'filter' ? 'tab-selected' : ''} onClick={() => setCurrentTab('filter')}>Filter</div>
                <div className={currentTab === 'info' ? 'tab-selected' : ''} onClick={() => setCurrentTab('info')}>Info</div>
                <div className={currentTab === 'queue' ? 'tab-selected' : ''} onClick={() => setCurrentTab('queue')}>Queue</div>
              </div>
            </div>
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