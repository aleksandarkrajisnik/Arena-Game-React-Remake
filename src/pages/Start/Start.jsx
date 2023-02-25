import React, { useState } from 'react';
import './Start.scss';
import backgroundVideo from '../../assets/img/videoBackground.mp4';
import LoginForm from './components/LoginForm/LoginForm';
import Selection from './components/Selection/Selection';
import ArenaLogo from '../../assets/img/ArenaCloudLogo.svg'
import Game from './components/Game/Game';
import { AnimatePresence, motion } from 'framer-motion';

const Login = () => {

  
  const [userBall, setUserBall] = useState(null);

  const [showForm, setShowForm] = useState(true);
  const [showSelection, setShowSelection] = useState(false);
  const [showGame, setShowGame] = useState(false);

  const ANIMATION_DURATION = 0.3;

  return (
    <div className='appContainer'>
        <video muted autoPlay loop id='backgroundVideo'>
            <source src={backgroundVideo} type='video/mp4'/>
        </video>

        <div className="gameWrapper">
            <div className="logoContainer">
              <img
                className='logo'
                src={ArenaLogo}
                style={{ width: 170 }}
                alt="website logo"
              />
            </div>
            <AnimatePresence>
              {showForm && 
                <motion.div
                  className='loginForm'
                  key={"loginForm"}
                  initial={{ opacity: 0, }}
                  animate={{ opacity: 1, transition: { duration: ANIMATION_DURATION } }}
                  exit={{ opacity: 0 }}>
                    <LoginForm 
                      handleNext={() => {
                        setShowForm(false);
                        setTimeout(() => {setShowSelection(true)}, ANIMATION_DURATION * 1000)
                      }} 
                    />
                </motion.div>
              }
              {showSelection && 
                <motion.div 
                  className='selectionContainer'
                  key={"selectionContainer"}
                  initial={{ opacity: 0, }}
                  animate={{ opacity: 1, transition: { duration: ANIMATION_DURATION } }}
                  exit={{ opacity: 0 }}
                >
                  <Selection 
                    handleNext={() => {
                    setShowSelection(false);
                    setTimeout(() => {setShowGame(true)}, 500)
                  }}  
                    pickBall={(e) => {setUserBall(e)}} 
                  />
                </motion.div>
              }
              {showGame && <Game incrementStep={console.log(1)} userBall={userBall} />}
            </AnimatePresence>
            
        </div>
    </div>
  )
}

export default Login