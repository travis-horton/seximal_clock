import {TimeKeepingUnit, Vector} from './types';

const toRadian = (deg: number): number => deg * Math.PI/180;

const getSVGRotation = (
  point: Vector,
  axis: Vector,
  angle: number,
): Vector => {
  const x = point.x - axis.x;
  const y = -(point.y - axis.y);

  return {
    x: x * Math.cos(angle) + y * Math.sin(angle) + axis.x,
    y: -(-x * Math.sin(angle) + y * Math.cos(angle)) + axis.y,
  }
};

const findHexagonStartPoint = (
  parentStart: Vector,
  percentIntoUnit: number,
  length: number,
): Vector => {
  const howFarAlongTheLine = ((percentIntoUnit * 6) % 1) * 2/3;
  const startX = parentStart.x + (
    length * Math.floor(howFarAlongTheLine / (1/3))
  );
  const startY = -(-parentStart.y);

  const angle = (howFarAlongTheLine % (1/3)) * 180;
  const toAddXRotation = (length) * Math.cos(toRadian(angle));
  const toAddYRotation = (length) * Math.sin(toRadian(angle));

  return {
    x: startX - toAddXRotation + (length),
    y: startY + toAddYRotation,
  };
};

const depth = (unit: TimeKeepingUnit): number => {
  return unit.smallerUnit
    ? 1 + depth(unit.smallerUnit)
    : 1;
};

export {
  toRadian,
  getSVGRotation,
  depth,
  findHexagonStartPoint,
};
