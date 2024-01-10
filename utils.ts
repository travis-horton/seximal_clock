import {TimeKeepingUnit, Vector} from './types';

const toRadian = (deg: number): number => deg * Math.PI/180;

type rotatePointVAroundPointWByAProps = {
  v: Vector,
  w: Vector,
  a: number,
};
const rotatePointVAroundPointWByA = (
  {v, w, a}: rotatePointVAroundPointWByAProps 
): Vector => {
  const rad = toRadian(a);
  // Remove vector w to imitate rotating around origin
  const vOffset = {
    x: v.x - w.x,
    y: v.y - w.y,
  };
  // Rotate offset vector around origin
  const rotatedPoint = {
    x: (vOffset.x * Math.cos(rad)) - (vOffset.y * Math.sin(rad)),
    y: (vOffset.y * Math.cos(rad)) + (vOffset.x * Math.sin(rad)),
  };
  // Add back vector w to now-rotated point
  return {
    x: rotatedPoint.x + w.x,
    y: rotatedPoint.y + w.y,
  };
};

const getScale = (depth: number): number => {
  return Math.pow(3, depth - 1) * 1.14;
};

const getDepth = (unit: TimeKeepingUnit): number => {
  return unit.smallerUnit
    ? 1 + getDepth(unit.smallerUnit)
    : 1;
};

export {
  getDepth,
  getScale,
  rotatePointVAroundPointWByA,
  toRadian,
};
