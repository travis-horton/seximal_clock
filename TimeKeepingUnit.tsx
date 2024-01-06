import {niftimal, months} from './constants';

type TimeKeepingUnit = {
  value: number,
  smallerUnit?: TimeKeepingUnit,
};
type Vector = {
  x: number,
  y: number,
};

const depth = (unit: TimeKeepingUnit): number => {
  return unit.smallerUnit
    ? 1 + depth(unit.smallerUnit)
    : 1;
};
const toRadian = (deg: number) => deg * Math.PI/180;
const getSVGRotation = (point: Vector, axis: Vector, angle: number) => {
  const x = point.x - axis.x;
  const y = -(point.y - axis.y);

  return {
    x: x * Math.cos(angle) + y * Math.sin(angle) + axis.x,
    y: -(-x * Math.sin(angle) + y * Math.cos(angle)) + axis.y,
  }
};

type TimeKeepingUnitProps = {
  unit: TimeKeepingUnit,
  parentCenter?: Vector,
}

const TimeKeepingUnit = (
  {unit, parentCenter}: TimeKeepingUnitProps
) => {
  const {value} = unit;
  const scale = depth(unit);
  const angle = toRadian(value * 10);

  const thisCenter = parentCenter 
    ? (
      getSVGRotation(
        {x: parentCenter.x, y: parentCenter.y - ((Math.pow(3, scale - 1)) * 2)},
        parentCenter,
        angle,
      )
    )
    : {x: 100, y: 100};

  return (
    <>
      <circle
        cx={thisCenter.x}
        cy={thisCenter.y}
        r={Math.pow(3, scale - 1)}
      />
      <text
        x={thisCenter.x}
        y={thisCenter.y}
        style={{font: `normal ${scale}px monospace`}}
      >
        {depth(unit) === 5 ? months[value] : niftimal[Math.floor(value)]}
      </text>
      {unit.smallerUnit && <TimeKeepingUnit unit={unit.smallerUnit} parentCenter={thisCenter} />}
    </>
  );
};

export default TimeKeepingUnit;
