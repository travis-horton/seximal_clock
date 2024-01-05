import {niftimal} from './constants';

type Unit = {
  value: number,
  smallerUnit?: Unit,
};

const depth = (unit: Unit): number => {
  return unit.smallerUnit
    ? 2 + depth(unit.smallerUnit)
    : 1;
};
const toRadian = (deg) => deg * Math.PI/180;

type Barycenter = {
  x: number,
  y: number,
};
type TimeKeepingUnitProps = {
  unit: Unit,
  barycenter?: Barycenter,
}

const TimeKeepingUnit = (
  {unit, barycenter}: TimeKeepingUnitProps
) => {
  const {value} = unit;
  const scale = depth(unit);
  const angle = toRadian(value * 10);

  // TODO: You have to manually calculate the new center because we have to pass
  // it down to the subUnits. That involves trig, so math time...
  // I think it's:
  // x' =  x*cos(a) + y*sin(a)
  // y' = -x*sin(a) + y*cos(a)
  // but you have to account for the grid not being centered.
  const thisCenter = barycenter 
    ? {x: 20, y: 20} // <--- HERE
    : {x: 20, y: 20};

  barycenter = barycenter || thisCenter;

  return (
    <>
      <circle
        cx={thisCenter.x}
        cy={thisCenter.y}
        r={scale}
      />
      <text
        x={thisCenter.x}
        y={thisCenter.y}
        style={{font: `normal ${scale}px monospace`}}
      >
        {niftimal[Math.floor(value)]}
      </text>
      {unit.smallerUnit && <TimeKeepingUnit unit={unit.smallerUnit} barycenter={thisCenter} />}
    </>
  );
};

export default TimeKeepingUnit;
