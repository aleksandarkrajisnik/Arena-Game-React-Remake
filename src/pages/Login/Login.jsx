import React, { useState } from 'react';
import './Login.scss';
import backgroundVideo from '../../assets/img/videoBackground.mp4';
import LoginForm from './components/LoginForm/LoginForm';
import Selection from './components/Selection/Selection';
import ArenaLogo from '../../assets/img/ArenaCloudLogo.svg'
import Game from './components/Game/Game';

const Login = () => {

  const [stepCount, setStepCount] = useState(1);
  const [userBall, setUserBall] = useState(null);

  const incrementStep = () => setStepCount(prevCount => prevCount + 1);

  return (
    <div className='loginContainer'>
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
            {stepCount === 1 && <LoginForm incrementStep={incrementStep} />}
            {stepCount === 2 && <Selection incrementStep={incrementStep} pickBall={(e) => {setUserBall(e)}} />}
            {stepCount === 3 && <Game incrementStep={incrementStep} userBall={userBall} />}
        </div>
    </div>
  )
}

export default Login