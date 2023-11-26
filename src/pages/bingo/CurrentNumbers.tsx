import { useEffect, useState } from "react";

const CurrentNumbers = ({ currentNum }: { currentNum: string }) => {
  const [carouselNums, setCarouselNums] = useState<
    [string, string, string, string]
  >(["", "", currentNum, ""]);

  useEffect(() => {
    setCarouselNums([
      carouselNums[1],
      carouselNums[2],
      carouselNums[3],
      currentNum,
    ]);

    // TODO: Do animation

    // TODO: setCarouselNums again
  }, [currentNum]);

  return (
    <div className="flex justify-center items-center">
      <div
        id="small-num"
        className="raised-connected font-bold rounded-lg h-12 w-12 mx-3 flex justify-center items-center"
      >
        {carouselNums[1]}
      </div>
      <div
        id="main-num"
        className="raised-connected font-bold rounded-lg h-20 w-20 mx-3 flex justify-center items-center"
      >
        {carouselNums[2]}
      </div>
    </div>
  );
};

export default CurrentNumbers;
