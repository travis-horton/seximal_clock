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
  const thisCenter = barycenter 
    ? {x: barycenter.x, y: barycenter.y - (scale * 2)}
    : {x: 20, y: 20};
  barycenter = barycenter || thisCenter;

  return (
    <>
      <circle
        cx={thisCenter.x}
        cy={thisCenter.y}
        r={scale}
        transform={
          `rotate(${value * 10} ${barycenter.x} ${barycenter.y})`
        }
      />
      <text
        x={barycenter.x - (scale * 0.3)}
        y={barycenter.y - (scale * 2) + (scale * 0.3)}
        transform={
          `rotate(${value * 10} ${barycenter.x} ${barycenter.y})`
        }
        style={{font: `normal ${scale}px monospace`}}
      >
        {niftimal[Math.floor(value)]}
      </text>
      {unit.smallerUnit && <TimeKeepingUnit unit={unit.smallerUnit} barycenter={thisCenter} />}
    </>
  );
};

export default TimeKeepingUnit;
