// import { useEffect, useState } from "react";

// import AnimatedView from "@/pages/bingo/current-numbers/AnimatedView";
// import DefaultView from "@/pages/bingo/current-numbers/DefaultView";

const CurrentNumbers = ({ currentNums }: { currentNums: [string, string] }) => {
  // const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className="flex justify-center items-center">
      {/* {!isAnimating ? (
        <DefaultView carouselNums={carouselNums} />
      ) : (
        <AnimatedView carouselNums={carouselNums} />
      )} */}
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
