import React from 'react';
import {niftimal, months} from './constants';
import {TimeKeepingUnit, Vector} from './types';
import {
  getDepth,
} from './utils';
import Hexagon, {findHexagonStartPoint} from './Hexagon';

/*
const howFarAlongTheLine = ((value * 6) % 1 * 2/3)
const angle = ((howFarAlongTheLine * Math.PI * 3/2) % (Math.PI / 2)) * 2/3;
*/

const getScale = (depth: number): number => {
  return Math.pow(3, depth - 1) * 1.14;
};

type TimeKeepingUnitProps = {
  unit: TimeKeepingUnit,
  start: Vector,
  angle: number,
}
const TimeKeepingUnit = (
  {unit, start, angle}: TimeKeepingUnitProps
) => {
  const depth = getDepth(unit);

  return (
    <>
      <Hexagon
        start={start}
        length={getScale(depth)}
        angle={angle}
        value={unit.value}
      />
      {unit.smallerUnit && (
        <TimeKeepingUnit
          unit={unit.smallerUnit}
          start={findHexagonStartPoint({
            parentStart: start,
            parentAngle: angle,
            percentIntoUnit: unit.smallerUnit.value,
            length: getScale(depth),
          })}
          angle={angle}
        />
      )}
    </>
  );
};

export default TimeKeepingUnit;
