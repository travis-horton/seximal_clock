import React, {ReactElement} from 'react';

import {Vector} from './types';
import {getHexagonCenter} from './Hexagon';
import {rotatePointVAroundPointWByA} from './utils';

const getTriangleStartFromHexStartAndAngle = ({
  hexStart,
  hexAngle,
  hexLength,
  hexEdge,
}): Vector => {
  const vectorToHexSide = rotatePointVAroundPointWByA({
    v: hexStart,
    w: getHexagonCenter({
      start: hexStart, angle: hexAngle, length: hexLength,
    }),
    a: (hexEdge * 60),
  });
  const vectorAlongEdge = rotatePointVAroundPointWByA({
    v: {x: hexLength/3, y: 0},
    w: {x: 0, y: 0},
    a: hexAngle + (hexEdge * 60),
  });

  return {
    x: vectorToHexSide.x + vectorAlongEdge.x,
    y: vectorToHexSide.y + vectorAlongEdge.y,
  };
};


const getTrianglePoints = (
  start: Vector,
  angle: number,
  length: number,
): number[] => {
  let x = start.x;
  let y = start.y;
  const points: number[] = [x, y];
  let nextPoint = rotatePointVAroundPointWByA({
    v: {x: length, y:0},
    w: {x: 0, y: 0},
    a: angle,
  });
  x = x + nextPoint.x;
  y = y + nextPoint.y;
  points.push(x, y);

  nextPoint = rotatePointVAroundPointWByA({
    v: {x: length * 2, y:0},
    w: {x: 0, y: 0},
    a: angle + 120,
  });
  x = x + nextPoint.x;
  y = y + nextPoint.y;
  points.push(x, y);

  nextPoint = rotatePointVAroundPointWByA({
    v: {x: length, y:0},
    w: {x: 0, y: 0},
    a: angle,
  });
  x = x + nextPoint.x;
  y = y + nextPoint.y;

  points.push(x, y);

  return points;
};

type TrianglesProps = {
  hexStart: Vector,
  hexAngle: number,
  hexLength: number,
};
const DecorativeTriangles = (
  {hexStart, hexAngle, hexLength}: TrianglesProps
): ReactElement => {
  return (
    <>
      {[0, 1, 2, 3, 4, 5].map(i => {
        const start = getTriangleStartFromHexStartAndAngle({
          hexStart,
          hexAngle,
          hexLength,
          hexEdge: i,
        });
        const angle = hexAngle + (60 * i);
        const points = getTrianglePoints(start, angle, hexLength/3);
        return (
          <polygon
            key={`triangle${i}`}
            points={points}
            fill="blue"
          />
        );
      })}
    </>
  );
};

export default DecorativeTriangles;
