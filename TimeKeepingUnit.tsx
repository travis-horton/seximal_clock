import React from 'react';
import {niftimal, months} from './constants';
import {TimeKeepingUnit, Vector} from './types';
import {toRadian, getSVGRotation, depth} from './utils';
import Hexagon from './Hexagon';

type TimeKeepingUnitProps = {
  unit: TimeKeepingUnit,
  parentCenter?: Vector,
}
const TimeKeepingUnit = (
  {unit, parentCenter}: TimeKeepingUnitProps
) => {
  const {value} = unit;
  const scale = depth(unit);
  const angle = toRadian(value * 10);

  const thisCenter = parentCenter 
    ? (
      getSVGRotation(
        {x: parentCenter.x, y: parentCenter.y - ((Math.pow(3, scale - 1)) * 2)},
        parentCenter,
        angle,
      )
    )
    : {x: 100, y: 100};

  return (
    <>
      <circle
        cx={thisCenter.x}
        cy={thisCenter.y}
        r={Math.pow(3, scale - 1)}
      />
      {/* Just take out this Hexagon... */}
      <Hexagon
        start={{
          x: thisCenter.x - Math.pow(3, scale - 1)/1.5,
          y: thisCenter.y - Math.pow(3, scale - 1),
        }}
        length={Math.pow(3, scale - 1)*1.14}
        angle={angle}
      />
      <text
        x={thisCenter.x}
        y={thisCenter.y}
        style={{font: `normal ${scale}px monospace`}}
      >
        {depth(unit) === 5 ? months[value] : niftimal[Math.floor(value)]}
      </text>
      {unit.smallerUnit && <TimeKeepingUnit unit={unit.smallerUnit} parentCenter={thisCenter} />}
    </>
  );
};

export default TimeKeepingUnit;
