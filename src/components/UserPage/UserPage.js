import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import ProgressItem from '../ProgressItem/ProgressItem';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import './UserPage.scss'

const url = PROCESS.env.API_URL_PROGRESS

const UserPage = ({ match }) => {
  const [progress, setProgress] = useState([]);
  const [currentDisplay, setCurrentDisplay] = useState({});
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      if (action === 'PUSH') {
        setProgress([]);
      }
    })
    const getProgress = async () => {
      let response = await fetch(`${url}?username=${match.params.username}`);
      let currentProgress = (await response.json()).progress;
      if (!currentProgress || !currentProgress.length) {
        return;
      }
      setCurrentDisplay(currentProgress[0])
      let offset = 50;
      const updateProgress = prev => [...prev, ...currentProgress];
      while (currentProgress && currentProgress.length > 0) {
        setProgress(updateProgress);
        response = await fetch(`${url}?username=${match.params.username}&offset=${offset}`);
        currentProgress = (await response.json()).progress;
        offset += 50;
      }
    }
    getProgress();
    return () => {
      unlisten();
    }
  }, [match, history]);

  const handleClick = (i) => {
    setCurrentDisplay(progress[i]);
  }

  return (
    progress.length
      ?
      <div id='user-page'>
        <div>{match.params.username}</div>
        <div className='songs-container'>
          <div className='progress-item-list-container'>
            {progress.map((item, i) => <ProgressItem
              item={item}
              key={item._id}
              onClick={() => handleClick(i)}
            />)}
          </div>
          <VideoPlayer src={currentDisplay ? currentDisplay : {}} />
        </div>
      </div>
      :
      <div id='user-page'>This user doesn't have any progress</div>
  )
}

export default withRouter(UserPage);