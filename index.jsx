import React, { useState, useEffect } from 'react';

import './styles.css';

const sexaHoursInADay = 36;
const sexaMinsInADay = 36 * sexaHoursInADay;
const sexaSecsInADay = 36 * sexaMinsInADay;

const milliSecondsInADay = 1000 * 60 * 60 * 24;

export const SeximalTimeKeeping = () => {
  const [time, setTime] = useState(new Date());
  const whichHexaSecond = (time.getTime() % milliSecondsInADay) * (
    sexaSecsInADay / milliSecondsInADay 
  ) % 36;

  useEffect(() => {
    const timerID = setInterval( () => tick(), 50);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setTime(new Date());
  }

  return (
    <div>
      <svg viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="12" />
      <Marks />
      <ClockLabels />
      <circle
        cx="20"
        cy="7"
        r="1"
        transform={`rotate(${whichHexaSecond * 10} 20 20)`}
        className="seconds"
      />
      <text
        x="20"
        y="7"
        className="time"
      >
        :{niftimal[Math.floor(whichHexaSecond)]}
      </text>
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

const niftimal = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
  "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
]
