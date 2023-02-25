import React from 'react'
import Football from '../../../../assets/img/football.png'
import Basketball from '../../../../assets/img/basketball.png'

import './Selection.scss';

const Selection = ({handleNext, pickBall}) => {

  const ANIMATION_DURATION = 0.3;

  return (
    <>
        <h1>Odaberite znak</h1>
        <div className="balls">
          <img
            src={Football}
            style={{ width: 180 }}
            alt="football"
            onClick={() => {
              pickBall('football');
              handleNext();
            }}
            className='selectionImg'
          />
          <img
            src={Basketball}
            style={{ width: 180 }}
            alt="basketball"
            onClick={() => {
              pickBall('basketball');
              handleNext();
            }}
            className='selectionImg'
          />
         
        </div>
    </>
    
  )
}

export default Selection