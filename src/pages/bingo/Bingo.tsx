import { useState } from "react";
import { useTranslation } from "react-i18next";

import CurrentNumbers from "@/pages/bingo/current-numbers/CurrentNumbers";
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

  const [currentNums, setCurrentNums] = useState<[string, string]>(["", ""]);
  const [remainingNumbers, setRemainingNumbers] = useState<number[]>(
    generateRangeOfNums({ start: 1, end: 75 })
  );

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
      return `${t("bingo.bingo_letters.b")}${value}`;
    else {
      console.error(t("bingo.errors.invalid_number"), value);
      return "";
    }
  };
  const getNextNumber = (): void => {
    const selectedIndex = Math.floor(Math.random() * remainingNumbers.length);

    setCurrentNums([
      currentNums[1],
      getBingoValue(remainingNumbers[selectedIndex]),
    ]);

    const newNums = [...remainingNumbers];
    newNums.splice(selectedIndex, 1);
    setRemainingNumbers(newNums);
  };

  return (
    <div
      id="bingo"
      className="h-screen w-screen flex justify-center items-center"
    >
      <div
        id="bingo-body"
        className="raised-connected-on-primary pb-6 m-6 max-h-[90%] rounded-xl overflow-y-auto flex flex-col"
      >
        <h1 className="font-bold text-center text-3xl mt-2">
          {t("bingo.header")}
        </h1>

        <div
          id="number-display-area"
          className="p-6 mb-2 max-w-[100%] overflow-x-auto flex"
        >
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

        <div
          id="next-number-area"
          className="flex flex-col justify-center items-center"
        >
          {remainingNumbers.length ? (
            <button
              id="next-number-btn"
              className="raised-connected font-bold rounded-lg px-4 py-1"
              onClick={() => getNextNumber()}
            >
              {t("bingo.buttons.next")}
            </button>
          ) : (
            <button
              id="reset-numbers-btn"
              className="raised-connected font-bold rounded-lg px-4 py-1"
              onClick={() =>
                setRemainingNumbers(generateRangeOfNums({ start: 1, end: 75 }))
              }
            >
              {t("bingo.buttons.reset")}
            </button>
          )}

          <div className="mt-6">
            <CurrentNumbers currentNums={currentNums} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bingo;
