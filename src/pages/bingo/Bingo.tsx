import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import NumberDisplay from "@/pages/bingo/NumberDisplay";

const Bingo = () => {
  const { t } = useTranslation();

  const [remainingNumbers, setRemainingNumbers] = useState<number[]>([]);

  const getBingoValue = (value: number): string => {
    if (value >= 61 && value <= 75)
      return `${t("bingo.bingo_letters.o")}${value}`;
    else if (value >= 46 && value <= 60)
      return `${t("bingo.bingo_letters.g")}${value}`;
    else if (value >= 31 && value <= 45)
      return `${t("bingo.bingo_letters.n")}${value}`;
    else if (value >= 16 && value <= 30)
      return `${t("bingo.bingo_letters.i")}${value}`;
    else if (value >= 1 && value <= 15)
      return `${t("bingo.bingo_letters.b ")}${value}`;
    else {
      console.error(t("bingo.errors.invalid_number"), value);
      return "";
    }
  };
  const resetRemainingNumbers = (): void => {
    let nums: number[] = [];

    for (let i = 1; i <= 75; i++) {
      nums.push(i);
    }

    setRemainingNumbers(nums);
  };

  useEffect(() => {
    resetRemainingNumbers();
  }, []);

  return (
    <div className="raised-connected flex flex-col rounded-xl p-2">
      <h1 className="text-2xl font-bold text-center tracking-wide">
        {t("bingo.bingo").toUpperCase()}
      </h1>
      <NumberDisplay isActive={false} value={1} />
    </div>
  );
};

export default Bingo;
