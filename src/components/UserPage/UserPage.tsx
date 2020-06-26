import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ProgressItem from '../ProgressItem/ProgressItem';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import InfoItem from '../InfoItem/InfoItem';
import PageTabs from '../PageTabs/PageTabs';
import Loader from 'react-loader-spinner';
import Toggle from 'react-toggle';
import sortSongs from './sortFunctions';
import { Progress } from '../../types';
import './UserPage.scss';
import './react-toggle.scss';

const OFFSET = 500;
const STARTING_AMOUNT = 20;
const url = `https://serene-temple-88689.herokuapp.com`

type MatchParams = {
  username: string
}

type LoadingState =
  'unloaded' |
  'loading' |
  'loaded'

type SearchType =
  'title' |
  'artist' |
  'eng' |
  'rom' |
  'hits' |
  'miss' |
  'seen';

const UserPage = ({ match }: RouteComponentProps<MatchParams>) => {
  const [numSongs, setNumSongs] = useState(0);
  const [user, setUser] = useState<string>('');
  const [progress, setProgress] = useState<Progress[]>([]);
  const [currentDisplay, setCurrentDisplay] = useState<{ progress: Progress, auto: boolean } | null>(null);
  const [currentInfo, setCurrentInfo] = useState<Progress | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('unloaded');
  const [sortFun, setSortFun] = useState(1);
  const [isEnglish, setIsEnglish] = useState(true);
  const [isReversed, setIsReversed] = useState(false);
  const [currentTab, setCurrentTab] = useState<'filter' | 'info' | 'queue'>('filter');
  const [searchBy, setSearchBy] = useState<SearchType>('artist');
  const [search, setSearch] = useState('');
  const [numLoaded, setNumLoaded] = useState(0);
  const [numShowing, setNumShowing] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  // on page load
  useEffect(() => {
    const getUser = async () => {
      const dbUser = (await (await fetch(`${url}/users?username=${match.params.username}`)).json()).users[0];
      if (dbUser) {
        setUser(dbUser.displayName);
      }
    }
    const getProgress = async () => {
      // get first batch of STARTING_AMOUNT songs
      const response = await fetch(`${url}/progress?username=${match.params.username.toLowerCase()}&limit=${STARTING_AMOUNT}`);
      const firstBatch = (await response.json()).progress;
      if (!firstBatch || !firstBatch.paginatedResults.length) {
        return;
      }
      setProgress(firstBatch.paginatedResults);
      setNumSongs(firstBatch.totalCount[0].count);
      setNumLoaded(firstBatch.paginatedResults.length);
      setCurrentDisplay({ progress: firstBatch.paginatedResults[0], auto: false });
      setCurrentInfo(firstBatch.paginatedResults[0]);
      setLoadingState('loading');

      // function to set all songs after loading them
      const updateProgress = (prev: Progress[]) => {
        let latest = prev.concat(...responses);
        latest = sortSongs(latest, sortFun, isReversed);
        return latest;
      }

      // fetch the rest of the songs using promise all
      const urls = [];
      for (let currentOffset = STARTING_AMOUNT; currentOffset < firstBatch.totalCount[0].count; currentOffset += OFFSET) {
        urls.push({
          url: `${url}/progress?username=${match.params.username}&offset=${currentOffset}&limit=${OFFSET}`,
          offset: currentOffset
        })
      }
      const responses = await Promise.all(
        urls.map(async obj => {
          const response = await (await fetch(obj.url)).json();
          setNumLoaded(prev => prev + response.progress.paginatedResults.length);
          return response.progress.paginatedResults;
        })
      );
      setProgress(updateProgress);
      setLoadingState('loaded');
    }
    if (loadingState === 'unloaded') {
      getUser();
      getProgress();
    }
  }, [match, sortFun, loadingState, isReversed]);

  const handleCurrentDisplay = (i: number) => {
    setCurrentDisplay({ progress: progress[i], auto: true });
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

  const handleSearchBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'hits' || e.target.value === 'miss') {
      setSearch('0');
    } else if (e.target.value === 'seen') {
      setSearch('1');
    } else {
      setSearch('');
    }
    setSearchBy(e.target.value as SearchType);
  }

  const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNumShowing(parseInt(e.target.value));
  }

  if (loadingState === 'loaded' || 'loading') {
    return (
      <div id='user-page'>
        <h1>{user}</h1>
        <h3>Number of Songs Encountered: {numSongs}</h3>
        <div id='search-container'>
          <select
            onChange={handleSearchBy}>
            <option value='artist'>Search by Artist</option>
            <option value='title'>Search by Song Title</option>
            <option value='eng'>Search by Anime (English)</option>
            <option value='rom'>Search by Anime (Romaji)</option>
            <option value='hits'>Search by Hits</option>
            <option value='miss'>Search by Misses</option>
            <option value='seen'>Search by Number Seen</option>
          </select>
          <input type={
            searchBy === 'hits' || searchBy === 'miss' || searchBy === 'seen' ? 'number' : 'text'} id='song-search'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <br />
        <div id='items-per-page-container'>
          Items per page
          <select
            onChange={handleItemsPerPage}>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={500}>500</option>
          </select>
        </div>
        <PageTabs
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numPages={Math.floor(numSongs / numShowing)}
        />
        <div className='songs-container'>
          <div className='progress-item-list-container'>
            <div id='list-header'>
              <div>Title</div>
              <div>Artist</div>
              <div>Anime</div>
              <div>Hits</div>
              <div />
            </div>
            {progress.reduce((acc, item, i) => {
              if ((searchBy === 'title' && item.song[0].songName.toLowerCase().includes(search))
                || (searchBy === 'artist' && item.song[0].songArtist.toLowerCase().includes(search))
                || (searchBy === 'eng' && item.song[0].anime.english?.toLowerCase().includes(search))
                || (searchBy === 'rom' && item.song[0].anime.romaji?.toLowerCase().includes(search))
                || (searchBy === 'hits' && item.hits === parseInt(search))
                || (searchBy === 'miss' && item.misses === parseInt(search))
                || (searchBy === 'seen' && item.hits + item.misses === parseInt(search))
              ) {
                acc.push(<ProgressItem
                  item={item}
                  key={item._id}
                  onClick={() => handleCurrentInfo(i)}
                  onClickPlay={() => handleCurrentDisplay(i)}
                  isEnglish={isEnglish}
                />);
              }
              return acc;
            }, [] as JSX.Element[]).slice((currentPage - 1) * numShowing, (currentPage - 1) * numShowing + numShowing)}
          </div>
          <div id='right-fixed'>
            <VideoPlayer
              src={currentDisplay ? currentDisplay.progress.song[0] : null}
              auto={currentDisplay ? currentDisplay.auto : false}
            />
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
                          : <div id='filter-header'><Loader type="Hearts" color="#E06E77" height={50} width={50} />Loading Songs ({numLoaded}/{numSongs})</div>}
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
            Getting Songs... {numSongs ? `(${numLoaded}/${numSongs})` : ''}
      </div>
    )
  }
}

export default withRouter(UserPage);