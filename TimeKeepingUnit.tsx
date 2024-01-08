import React from 'react';
import {niftimal, months} from './constants';
import {TimeKeepingUnit, Vector} from './types';
import {
  toRadian,
  getSVGRotation,
  depth,
  findHexagonStartPoint,
} from './utils';
import Hexagon from './Hexagon';

type TimeKeepingUnitProps = {
  unit: TimeKeepingUnit,
  size?: number,
  parentCenter?: Vector,
  parentStart?: Vector,
}
const TimeKeepingUnit = (
  {unit, size, parentCenter, parentStart}: TimeKeepingUnitProps
) => {
  const {value} = unit;
  const scale = Math.pow(3, depth(unit) - 1) * 1.14;
  const angle = toRadian(value * 10);

  const thisCenter = parentCenter 
    ? (
      getSVGRotation(
        {x: parentCenter.x, y: parentCenter.y - ((Math.pow(3, scale - 1)) * 2)},
        parentCenter,
        angle,
      )
    )
    : {x: size ? size/2 : 0, y: size ? size/2 : 0};

  const hexStart = parentStart
    ? findHexagonStartPoint(parentStart, value, scale)
    : {x: size ? size / 3 : 0, y: size ? size / (3 * depth(unit)) : 0};

  const howFarAlongTheLine = ((value * 6) % 1 * 2/3)
  const hexAngle = ((howFarAlongTheLine * Math.PI * 3/2) % (Math.PI / 2)) * 2/3;

  return (
    <>
      {/*
        Just replace the Hexagon with the commented out code
        <circle
          cx={thisCenter.x}
          cy={thisCenter.y}
          r={Math.pow(3, scale - 1)}
        />
        <text
          x={thisCenter.x}
          y={thisCenter.y}
          style={{font: `normal ${scale}px monospace`}}
        >
          {depth(unit) === 5 ? months[value] : niftimal[Math.floor(value)]}
        </text>
      */}
      <Hexagon
        start={hexStart}
        length={scale}
        angle={-hexAngle}
      />
      {unit.smallerUnit && (
        <TimeKeepingUnit
          unit={unit.smallerUnit}
          parentCenter={thisCenter}
          parentStart={hexStart}
        />
      )}
    </>
  );
};

export default TimeKeepingUnit;
