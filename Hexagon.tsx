import React from 'react';
import {Vector} from './types';
import {toRadian, getRotationOffset} from './utils';

type findHexagonStartPointProps = {
  parentStart: Vector,
  parentAngle: number,
  percentIntoUnit: number,
  length: number,
};
const findHexagonStartPoint = ({
  parentStart, parentAngle, percentIntoUnit, length,
}: findHexagonStartPointProps): Vector => {
  const sideAndPercent = percentIntoUnit * 6;

  // GET TRANSLATION TO CORRECT PARENT EDGE
  // Calculate which parent edge we should be on.
  const whichParentEdge = Math.floor(sideAndPercent);
  // The vector offset to get to the correct parent edge
  const vectorToParentEdge = getRotationOffset(
    (whichParentEdge * 60) - 120, 1,
  )

  // To account for starting in the top right corner
  vectorToParentEdge.x += .5;
  vectorToParentEdge.y -= (Math.sqrt(3)/2);

  // To scale up by length
  vectorToParentEdge.x *= length;
  vectorToParentEdge.y *= -length;

  // GET TRANSLATION ALONG PARENT EDGE
  // We only want to go 2/3rds of the way along the line because rotating from
  // the 2nd third gets you all the way across.
  const percentIntoEdge = Math.floor((sideAndPercent % 1) * 2) * 1/3;
  const howFarAlongTheLine = percentIntoEdge * length;
  // The vector along the parent edge based on the parent hex rotation.
  const vectorAlongEdge = getRotationOffset(
    parentAngle + (whichParentEdge * -60), howFarAlongTheLine
  );

  // TODO: GET ROTATION OF STARTING POINT
  const percentRotated = ((sideAndPercent % 1) * 2) % 1;
  const degreeRotated = -60 * percentRotated;

  console.log(degreeRotated)
  console.log(whichParentEdge)

  return {
    x: parentStart.x + vectorAlongEdge.x + vectorToParentEdge.x,
    y: parentStart.y + vectorAlongEdge.y + vectorToParentEdge.y,
  };
};

const getHexPoints = (
  start: Vector,
  length: number,
  angle: number,
): number[] => {
  const points: number[] = [start.x, start.y];
  let curX = start.x;
  let curY = start.y;
  for (let step: number = 0; step < 6; step++) {
    curX = (Math.cos(angle + toRadian(60 * step)) * length) + curX;
    curY = (Math.sin(angle + toRadian(60 * step)) * length) + curY;
    points.push(curX, curY);
  }

  return points;
};

type SVGHexagonProps = {
  start: Vector,
  length: number,
  angle: number,
  value: number,
};
const SVGHexagon = ({
  start,
  length,
  angle,
  value,
}: SVGHexagonProps): HTMLElement => {
  const sideAndPercent = value * 6;
  // GET TRANSLATION TO CORRECT PARENT EDGE
  // Calculate which parent edge we should be on.
  const whichParentEdge = Math.floor(sideAndPercent);

  // GET ROTATION OF CURRENT HEX
  const percentRotated = -((sideAndPercent % 1) * 2) % 1;
  const degreeRotated = 60 * percentRotated;

  const points = getHexPoints(
    start,
    length,
    angle + toRadian(whichParentEdge * 60) + toRadian(degreeRotated),
  ).join(",");
  return (
    <polygon
      points={points}
      stroke="black"
      stroke-width=".1"
    />
  );
};

export {
  findHexagonStartPoint,
};
export default SVGHexagon;

/*
 * THESE ARE THE TRIANGLES WE WANT...
            <polygon points={`
              ${curStart.x + length/3}, ${curStart.y}
              ${curStart.x + length/2}, ${curStart.y + (length/3 * Math.sqrt(3)/2)}
              ${curStart.x + (length * 2/3)}, ${curStart.y}
            `}
              fill="grey" stroke-width=".1"
              transform={`rotate(${60 * i} ${curStart.x} ${curStart.y})`}
            />
            <polygon points={`
              ${curStart.x + length/2}, ${curStart.y + (length/3 * Math.sqrt(3)/2)}
              ${curStart.x + length/3}, ${curStart.y + 2 * (length/3 * Math.sqrt(3)/2)}
              ${curStart.x + length * 2/3}, ${curStart.y + 2 * (length/3 * Math.sqrt(3)/2)}
            `}
              fill="grey" stroke-width=".1"
              transform={`rotate(${60 * i} ${curStart.x} ${curStart.y})`}
            />
 */
