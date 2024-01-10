import React, {ReactElement} from 'react';
import {Vector} from './types';
import {
  toRadian,
  rotatePointVAroundPointWByA
} from './utils';

type getHexagonCenterProps = {
  start: Vector, angle: number, length: number,
};
const getHexagonCenter = (
  {start, angle, length}: getHexagonCenterProps
): Vector => {
  return rotatePointVAroundPointWByA({
    v: {x: start.x + length, y: start.y},
    w: start,
    a: angle + 60,
  });
};

type findHexagonStartPointProps = {
  parentStart: Vector,
  parentAngle: number,
  value: number,
  length: number,
};
const findHexagonStartPoint = (
  {parentStart, parentAngle, value, length}: findHexagonStartPointProps
): Vector => {
  const valueScaled = value * 6;
  const parentLength = length * 3;

  // GET TRANSLATION TO CORRECT PARENT EDGE
  const edge = Math.floor(valueScaled);
  const parentCenter = getHexagonCenter({
    start: parentStart,
    angle: parentAngle,
    length: parentLength,
  });

  const vectorToEdge = rotatePointVAroundPointWByA({
    v: parentStart,
    w: parentCenter,
    a: edge * 60,
  });

  // GET TRANSLATION ALONG PARENT EDGE
  const percentAlongEdge = (valueScaled) % 1;
  // We only want to go 2/3rds of the way along the line because rotating from
  // the 2nd third gets you all the way across.
  const renderedPercentAlongEdge = (
    Math.floor(percentAlongEdge * 2) * 1/3
  );
  const vectorAlongEdge = rotatePointVAroundPointWByA({
    v: {x: parentLength * renderedPercentAlongEdge, y: 0},
    w: {x: 0, y: 0},
    a: 60 * edge + parentAngle,
  });
  // The vector along the parent edge based on the parent hex rotation.
  const vectorToPercentAlongEdge = {
    x: vectorToEdge.x + vectorAlongEdge.x,
    y: vectorToEdge.y + vectorAlongEdge.y,
  };

  // GET ROTATION OF STARTING POINT
  // We rotate around the second point of the hex, which is the rendered percent
  // along the edge plus the length.
  const vectorAlongEdgePlusLength = rotatePointVAroundPointWByA({
    v: {x: (parentLength * renderedPercentAlongEdge) + length, y: 0},
    w: {x: 0, y: 0},
    a: 60 * edge + parentAngle,
  });
  const pointToRotateAround = {
    x: vectorAlongEdgePlusLength.x + vectorToEdge.x,
    y: vectorAlongEdgePlusLength.y + vectorToEdge.y,
  };
  const angleToRotateBy = -60 * ((percentAlongEdge * 2) % 1);
  const finalVector = rotatePointVAroundPointWByA({
    v: vectorToPercentAlongEdge,
    w: pointToRotateAround,
    a: angleToRotateBy,
  });

  return finalVector;
};

type findHexagonAngleProps = {
  parentAngle: number,
  percentIntoUnit: number,
};
const findHexagonAngle = ({
  parentAngle, percentIntoUnit,
}: findHexagonAngleProps): number => {
  const sideAndPercent = percentIntoUnit * 6;
  // GET TRANSLATION TO CORRECT PARENT EDGE
  // Calculate which parent edge we should be on.
  const whichParentEdge = Math.floor(sideAndPercent);

  // GET ROTATION OF CURRENT HEX
  const percentRotated = -((sideAndPercent % 1) * 2) % 1;
  const degreeRotated = 60 * percentRotated;

  return parentAngle + (whichParentEdge * 60) + degreeRotated;
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
    curX = (Math.cos(toRadian(angle + (60 * step))) * length) + curX;
    curY = (Math.sin(toRadian(angle + (60 * step))) * length) + curY;
    points.push(curX, curY);
  }

  return points;
};

type SVGHexagonProps = {
  start: Vector,
  length: number,
  angle: number,
};
const SVGHexagon = ({
  start,
  length,
  angle,
}: SVGHexagonProps): ReactElement => {
  const points = getHexPoints(
    start,
    length,
    angle,
  ).join(",");
  return (
    <polygon
      points={points}
      stroke="black"
      strokeWidth=".1"
    />
  );
};

export {
  findHexagonStartPoint,
  findHexagonAngle,
};
export default SVGHexagon;
