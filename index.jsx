import React, { useState, useEffect } from 'react';

import TimeKeepingUnit from './TimeKeepingUnit';
import {
  sexaSecsInADay,
  sexaMinsInADay,
  // sexaHoursInADay,
  milliSecondsInADay,
} from './constants';
import './styles.css';

const SIZE = 40;

const getSexaTime = () => {
  const now = new Date();
  const currentMilliSecond = (now.getTime() % milliSecondsInADay);
  const percentIntoDay = currentMilliSecond / milliSecondsInADay;
  const sexaSecond = (sexaSecsInADay * percentIntoDay) % 36;
  const sexaMinute = (sexaMinsInADay * percentIntoDay) % 36;
  // const sexaHour = (sexaHoursInADay * percentIntoDay) % 36;

  return {
    value: 0,
    smallerUnit: {
      value: sexaMinute,
      smallerUnit: {
        value: sexaSecond/36,
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
        <TimeKeepingUnit
          unit={sexaTime}
          start={{x: SIZE/6, y: SIZE/6}}
          angle={0}
        />
      </svg>
    </div>
  );
};

const Marks = () => {
  const degrees = [];
  const second_marks = 36;

  for (let i = 0; i < second_marks; i++) {
    degrees.push(i * 10)
  }

  return (
    <g className="marks">
      {degrees.map((deg, idx) => {
        if (idx % 6 > 0) {
        return (
          <line 
            key={deg}
            x1="20"
            y1="31.5"
            x2="20"
            y2="31.25"
            transform={`rotate(${deg} 20 20)`}
          />
        )
        }
      })}
    </g>
  );
};

const ClockLabels = () => {
  const number_of_labels = 6;
  const clock_labels = [];
  for (let i = 0; i < number_of_labels; i++) {
    clock_labels.push(i * (360 / number_of_labels) - 2.5);
  }

  return (
    <g>
      {clock_labels.map((deg, idx) => (
        <text
          key={deg}
          x="20"
          y="10"
          transform={`rotate(${deg} 20 20)`}
          className="label"
        >
          {idx}
        </text>
      ))}
    </g>
  );
};

