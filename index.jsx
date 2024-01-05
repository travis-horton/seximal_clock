import React, { useState, useEffect } from 'react';

import TimeKeepingUnit from './TimeKeepingUnit';
import {sexaSecsInADay, milliSecondsInADay} from './constants';

import './styles.css';

const getSexaTime = () => {
  const now = new Date();
  const whichSexaSecond = (now.getTime() % milliSecondsInADay) * (
    sexaSecsInADay / milliSecondsInADay 
  ) % 36;

  return {
    value: 3,
    smallerUnit: {
      value: whichSexaSecond,
    },
  }
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
      <svg viewBox="0 0 40 40">
      <TimeKeepingUnit unit={sexaTime} />
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

