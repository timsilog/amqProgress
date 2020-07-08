import React, { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import './Home.scss';
import arrow from './rightArrow.png';

const oneLiners = [
  'Never guess Sword Art on the wrong Lisa song ever again.',
  'Never confuse Yuki from nano.RIPE ever again.',
  `See how many times you've heard HEAD CHA LA.`,
  `See how many times you've heard GEGEGE.`,
  'Learn all the songs your friends are good at.',
  `Relisten to all those songs in Ranked you've never heard before.`,
  `Get those 10 rolls faster.`,
  `See all the different Lucky Star endings you've encountered.`,
  `Never get the wrong Haikyuu season ever again.`,
  `Never get the wrong Jojo season ever again.`,
  `Never guess the wrong Ali Project song ever again.`,
  `Learn all those 90's anime you missed out on.`,
  `Learn all the songs from the new anime you haven't seen yet.`,
  `Never guess Love Live on an Aikatsu song ever again.`,
  `Yes, Naruto has that many openings.`,
  `Never guess the wrong season again.`,
  `Wait, he did more than just the Tokyo Ghoul OP?`,
  `No more guessing My Hero Academia on every shounen song.`,
  `Never guess the wrong Fate season ever again.`,
  `Never guess the wrong Monogatari season ever again.`,
  `Learn the idol meta.`,
  `Learn every Initial D stage.`,
  `"But I never watch the ending" - Everyone else, but you.`,
  `See how many times you put the wrong season.`,
  // `Differentiate Gate from Highschool of the Dead.`,
  // `Differentiate Gangsta from Dimension W`
]

const Home = () => {
  const [currentLiner, setCurrentLiner] = useState(Math.floor(Math.random() * oneLiners.length));
  const [arrowHidden, setArrowHidden] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    const interval = setInterval(() => {
      setCurrentLiner(Math.floor(Math.random() * oneLiners.length));
    }, 10000);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    }
  })

  const handleScroll = (event: any) => {
    const element = event.target.scrollingElement;
    if (!element.scrollTop) {
      setArrowHidden(false);
    }
    if (!arrowHidden && element.scrollTop > 50) {
      setArrowHidden(true);
    }
  }

  return (
    <div id='home'>
      <div id='wavy-container'>
        <div id='wave-content'>
          <h1>Track Your AMQ Progress</h1>
          <p>{oneLiners[currentLiner]}</p>
        </div>
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          id='wave'>
          <path
            d="M-1.12,149.50 C149.99,150.00 427.76,34.03 535.55,186.02 L502.82,-5.42 L-1.12,0.00 Z"
            id='wave-path'
          ></path>
        </svg>
      </div>
      <a target="_blank" rel="noopener noreferrer" id='get-extension' href='https://chrome.google.com/webstore/detail/amq-progress-tracker/knilkaomegchagchmhmdmdkcbfcfoggn/'>Get the Extension</a>
      <div className={`center-container${arrowHidden ? ' hide' : ''}`}><HashLink smooth to='#questions'><img className='arrow' src={arrow} alt='arrow' onClick={() => setArrowHidden(true)} /></HashLink></div>
      <div id='questions'>
        <h1>What is it?</h1>
        <p>The AMQ Progress Tracker is a Chrome Extension that will automatically track songs you encounter in Anime Music Quiz, your guesses, and whether you got it right or wrong. See which songs you perform well on or which songs you can just never get. This is entirely to track performance and cannot / will not assist your gameplay in any way. In other words, this extension does not cheat.</p>
        <h1>How Does it Work?</h1>
        <p>Simply install the extension and start playing! It does everything automatically for you. You can also disable it whenever you want. Then visit this website to view your progress.</p>
        <h1>What Data is Used?</h1>
        <p>The only information that is stored is your AMQ username, your guess, whether you got the song right or wrong, and the last time you encountered the song.</p>
      </div>
    </div>
  )
}

export default Home;