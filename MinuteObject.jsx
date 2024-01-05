import TimeKeepingUnit from './TimeKeepingUnit';

const MinuteObject = ({sexaTime}) => {
  return (
    <>
      <circle cx="20" cy="20" r="3" />
      <TimeKeepingUnit
        unit={sexaTime.smallerUnit}
        barycenter={{x: 20, y: 20}}
      />
    </>
  );
}

export default MinuteObject;
