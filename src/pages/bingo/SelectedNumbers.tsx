import NumberDisplay from "@/pages/bingo/NumberDisplay";

const SelectedNumbers = ({
  header,
  inactiveNums,
  nums,
}: {
  header: string;
  inactiveNums: number[];
  nums: number[];
}) => {
  const renderNums = () => {
    return (
      <>
        {nums.map((num: number) => {
          return (
            <NumberDisplay
              key={num}
              isActive={!inactiveNums.includes(num)}
              value={num}
            />
          );
        })}
      </>
    );
  };

  return (
    <div
      key={inactiveNums.length}
      className="raised-connected rounded-xl mx-2 px-2 flex flex-col"
    >
      <h1 className="text-2xl font-bold text-center">{header}</h1>
      {renderNums()}
    </div>
  );
};

export default SelectedNumbers;
