import {TimeKeepingUnit, Vector} from './types';

// x = r cosθ and y = r sinθ, but remember y axis is upside down

const toRadian = (deg: number): number => deg * Math.PI/180;

const getRotationOffset = (angle: number, radius: number): Vector => {
  return {
    x: radius * Math.cos(toRadian(angle)),
    y: -radius * Math.sin(toRadian(angle)),
  };
};

const getDepth = (unit: TimeKeepingUnit): number => {
  return unit.smallerUnit
    ? 1 + getDepth(unit.smallerUnit)
    : 1;
};

export {
  toRadian,
  getDepth,
  getRotationOffset,
};
