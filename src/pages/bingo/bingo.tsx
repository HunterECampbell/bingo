import { useTranslation } from "react-i18next";

const Bingo = () => {
  const { t } = useTranslation();

  type BingoLetter = "B" | "I" | "N" | "G" | "O";

  const getBingoValue = (value: number) => {
    if (value < 1 || value > 75) {
      console.error(
        "Invalid number. Number must be between 1-75. Number was:",
        value
      );
    }
  };

  // const bingoNumbers: Record<number, `${BingoLetter}${number}`> = {
  //   1: "B1",
  //   2: "B2",
  //   3: "B3",
  //   4: "B4",
  //   5: "B5",
  //   6: "B6",
  //   7: "B7",
  //   8: "B8",
  //   9: "B9",
  //   10: "B10",
  //   11: "B11",
  //   12: "B12",
  //   13: "B13",
  //   14: "B14",
  //   15: "B15",
  //   16: "I16",
  //   17: "I17",
  //   18: "I18",
  //   19: "I19",
  //   20: "I20",
  //   21: "I21",
  //   22: "I22",
  //   23: "I23",
  //   24: "I24",
  //   25: "I25",
  //   26: "I26",
  //   27: "I27",
  //   28: "I28",
  //   29: "I29",
  //   30: "I30",
  //   31: "N31",
  //   32: "N32",
  //   33: "N33",
  //   34: "N34",
  //   35: "N35",
  //   36: "N36",
  //   37: "N37",
  //   38: "N38",
  //   39: "N39",
  //   40: "N40",
  //   41: "N41",
  //   42: "N42",
  //   43: "N43",
  //   44: "N44",
  //   45: "N45",
  //   46: "G46",
  // };

  return (
    <div className="flex rounded-xl p-2" style={{ backgroundColor: "#e1ebf4" }}>
      <p>{t("bingo.errors.invalid_number")}</p>
    </div>
  );
};

export default Bingo;
