import React from 'react';
import {niftimal, months} from './constants';
import {TimeKeepingUnit, Vector} from './types';
import {getDepth, getScale} from './utils';
import Hexagon, {
  findHexagonStartPoint,
  findHexagonAngle,
} from './Hexagon';
import DecorativeTriangles from './Triangles';

type TimeKeepingUnitAttributes = {
  startPoint: Vector,
  angle: number,
};

type TimeKeepingUnitProps = {
  parentAttrs: TimeKeepingUnitAttributes,
  self: TimeKeepingUnit,
}
const TimeKeepingUnit = (
  {parentAttrs, self}: TimeKeepingUnitProps
) => {
  // TODO: Fix the extra roll
  const depth = getDepth(self);
  const angle = findHexagonAngle({
    parentAngle: parentAttrs.angle,
    percentIntoUnit: self.value,
  });
  const start = findHexagonStartPoint({
    parentStart: parentAttrs.startPoint,
    parentAngle: parentAttrs.angle,
    value: self.value,
    length: getScale(depth),
  });

  return (
    <>
      <Hexagon
        start={start}
        length={getScale(depth)}
        angle={angle}
      />
      <text y={20} x={(4 - depth) * 15} fontFamily="monospace">
        {niftimal[Math.floor(self.value * 36)]}
        {self.smallerUnit ? ":" : null}
      </text>
      <DecorativeTriangles
        hexStart={start}
        hexAngle={angle}
        hexLength={getScale(depth)}
      />
      {self.smallerUnit && (
        <TimeKeepingUnit
          parentAttrs={{
            startPoint: start,
            angle: angle,
          }}
          self={self.smallerUnit}
        />
      )}
    </>
  );
};

export default TimeKeepingUnit;
