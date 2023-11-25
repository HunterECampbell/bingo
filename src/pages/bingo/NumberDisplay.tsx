const ActiveNumber = () => {
  return (
    <div className="raised-connected-active rounded-full h-7 w-7 mr-2 flex justify-center items-center">
      <div className="inset-connected rounded-full h-5 w-5" />
    </div>
  );
};

const InactiveNumber = () => {
  return <div className="raised-connected rounded-full h-7 w-7 mr-2" />;
};

const NumberDisplay = ({
  isActive = false,
  value,
}: {
  isActive: boolean;
  value: number;
}) => {
  return (
    <div className="my-1 flex">
      {isActive ? <ActiveNumber /> : <InactiveNumber />}

      <p className="text-lg font-bold">{value}</p>
    </div>
  );
};

export default NumberDisplay;
