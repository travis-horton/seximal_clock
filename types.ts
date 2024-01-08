type TimeKeepingUnit = {
  value: number,
  smallerUnit?: TimeKeepingUnit,
};
type Vector = {
  x: number,
  y: number,
};

export {
  TimeKeepingUnit,
  Vector,
};
