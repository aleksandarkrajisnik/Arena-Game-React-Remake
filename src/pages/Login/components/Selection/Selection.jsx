import React from 'react'
import Football from '../../../../assets/img/football.png'
import Basketball from '../../../../assets/img/basketball.png'
import './Selection.scss';

const Selection = ({incrementStep, pickBall}) => {
  return (
    <div className='selectionContainer'>
        <h1>Odaberite znak</h1>
        <div className="balls">
          <img
            src={Football}
            style={{ width: 180 }}
            alt="football"
            onClick={() => {
              pickBall('football');
              incrementStep();
            }}
            className='selectionImg'
          />
          <img
            src={Basketball}
            style={{ width: 180 }}
            alt="basketball"
            onClick={() => {
              pickBall('basketball');
              incrementStep();
            }}
            className='selectionImg'
          />
         
        </div>
    </div>
  )
}

export default Selection