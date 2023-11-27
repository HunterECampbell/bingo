const CurrentNumbers = ({
  currentNums = ["", ""],
}: {
  currentNums: [string, string];
}) => {
  return (
    <div className="flex justify-center items-center">
      <div
        id="small-num"
        className="raised-connected font-bold rounded-lg h-12 w-12 mx-3 flex justify-center items-center"
      >
        {currentNums[0]}
      </div>
      <div
        id="main-num"
        className="raised-connected font-bold rounded-lg h-20 w-20 mx-3 flex justify-center items-center"
      >
        {currentNums[1]}
      </div>
    </div>
  );
};

export default CurrentNumbers;
