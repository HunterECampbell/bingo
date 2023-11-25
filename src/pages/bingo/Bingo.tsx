import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import SelectedNumbers from "@/pages/bingo/SelectedNumbers";

const Bingo = () => {
  const { t } = useTranslation();

  const generateRangeOfNums = ({
    start,
    end,
  }: {
    start: number;
    end: number;
  }): number[] => {
    let nums: number[] = [];

    for (let i = start; i <= end; i++) {
      nums.push(i);
    }

    return nums;
  };

  const bNums: number[] = generateRangeOfNums({ start: 1, end: 15 });
  const iNums: number[] = generateRangeOfNums({ start: 16, end: 30 });
  const nNums: number[] = generateRangeOfNums({ start: 31, end: 45 });
  const gNums: number[] = generateRangeOfNums({ start: 46, end: 60 });
  const oNums: number[] = generateRangeOfNums({ start: 61, end: 75 });

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
      <div className="flex">
        <SelectedNumbers
          header={t("bingo.bingo_letters.b")}
          inactiveNums={remainingNumbers}
          nums={bNums}
        />
        <SelectedNumbers
          header={t("bingo.bingo_letters.i")}
          inactiveNums={remainingNumbers}
          nums={iNums}
        />
        <SelectedNumbers
          header={t("bingo.bingo_letters.n")}
          inactiveNums={remainingNumbers}
          nums={nNums}
        />
        <SelectedNumbers
          header={t("bingo.bingo_letters.g")}
          inactiveNums={remainingNumbers}
          nums={gNums}
        />
        <SelectedNumbers
          header={t("bingo.bingo_letters.o")}
          inactiveNums={remainingNumbers}
          nums={oNums}
        />
      </div>
    </div>
  );
};

export default Bingo;
