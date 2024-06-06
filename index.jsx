import React, { useState, useEffect } from 'react';

import TimeKeepingUnit from './TimeKeepingUnit';
import Hexagon from './Hexagon';
import {
  sexaSecsInADay,
  sexaMinsInADay,
  sexaHoursInADay,
  milliSecondsInADay,
} from './constants';
import {getDepth, getScale} from './utils';
import {niftimal, months} from './constants';
import './styles.css';

const SIZE = 100;

const getSexaTime = () => {
  const now = new Date();
  const currentMilliSecond = (now.getTime() % milliSecondsInADay);
  const percentIntoDay = currentMilliSecond / milliSecondsInADay;
  const sexaSecond = (sexaSecsInADay * percentIntoDay) % 36;
  const sexaMinute = (sexaMinsInADay * percentIntoDay) % 36;
  const sexaHour = (sexaHoursInADay * percentIntoDay) % 36;

  return {
    value: sexaHour/36,
    factor: 36,
    smallerUnit: {
      value: sexaMinute/36,
      factor: 36,
      smallerUnit: {
        value: sexaSecond/36,
        factor: 36,
      },
    },
  };
};

export const SeximalTimeKeeping = () => {
  const [sexaTime, setSexaTime] = useState(getSexaTime());
  useEffect(() => {
    const timerID = setInterval( () => tick(), 20);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setSexaTime(getSexaTime());
  }

  return (
    <div>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <Hexagon
          start={{x: SIZE/2, y: SIZE/4}}
          length={getScale(getDepth(sexaTime) + 1)}
          angle={30}
        />
        <TimeKeepingUnit
          parentAttrs={{
            startPoint: {x: SIZE/2, y: SIZE/4},
            angle:30,
          }}
          self={sexaTime}
        />
      </svg>
    </div>
  );
};
