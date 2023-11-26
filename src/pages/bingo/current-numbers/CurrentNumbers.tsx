import { useEffect, useState } from "react";

import AnimatedView from "@/pages/bingo/current-numbers/AnimatedView";
import DefaultView from "@/pages/bingo/current-numbers/DefaultView";

const CurrentNumbers = ({ currentNum }: { currentNum: string }) => {
  const [isAnimating, setIsAnimating] = useState(false);
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
      {!isAnimating ? (
        <DefaultView carouselNums={carouselNums} />
      ) : (
        <AnimatedView carouselNums={carouselNums} />
      )}
    </div>
  );
};

export default CurrentNumbers;
