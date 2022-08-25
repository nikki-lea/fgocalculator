import { NextPage } from "next";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useContext, useRef, useState } from "react";
import { FgoContext, TargetOptions } from "../contexts";
import { Slider } from "@mui/material";

const Probability: NextPage = () => {
  const { t } = useTranslation();
  const { state } = useContext(FgoContext);
  const { totalSQForBanner, targetData } = state;
  const startingBudget = totalSQForBanner / targetData.length;
  const initialProbability = 0;
  const [targetSQ, setTargetSQ] = useState<number[]>(Array(3).fill(startingBudget));
  const [probabilities, setProbabilities] = useState<number[]>(Array(3).fill(initialProbability));

  const handleChange = (index: number) => (_event: Event, newValue: number | number[]) => {
    const targetCopy = [...targetSQ];
    targetSQ[index] = newValue as number; // We will always be passing a number to state here
    setTargetSQ(targetCopy);
  };

  return (
    <div className="probability-container">
      <h1>{t("rateup.chance.header")}</h1>
      <h2 className="subheader">{t("rateup.chance.subheader")}</h2>
      <div className="total-sq">
        <h2>{t("sq.future")}</h2>
        <Image
          src="/saintquartz.svg"
          alt="saintquartz"
          height={36}
          width={36}
        />
        <span>{state.totalSQForBanner}</span>
      </div>
      <div className="probability-calculations">
        {
        targetData.map((item, index) => {
            const typeCopy =
            item.type === TargetOptions.ce ? t("craftessence") : t("servant");
            return (
            <>
              <h3>{`${item.rarity}* ${typeCopy}`}</h3>
              <Slider
                aria-label="calculatedprobability"
                value={targetSQ[index]}
                onChange={handleChange(index)}
              />
              <h3>{t("rateup.chance.probability")}</h3>
              <h3>{probabilities[index]}</h3>
            </>)
            })
        }
      </div>
    </div>
  );
};

export default Probability;
