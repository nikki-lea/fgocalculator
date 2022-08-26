import { NextPage } from "next";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useContext, useState } from "react";
import { FgoContext, TargetOptions } from "../contexts";
import { Slider } from "@mui/material";
import { TargetDataType } from "../types/contexts";
import calcProbability from "../utils/calcProbability";

const Probability: NextPage = () => {
  const { t } = useTranslation();
  const { state } = useContext(FgoContext);
  const { totalSQForBanner, targetData } = state;
  const startingBudget = totalSQForBanner / targetData.length;
  const initialProbability: number[] = [];
  targetData.forEach((item) => initialProbability.push(calcProbability({...item, sq: startingBudget})));
  const [targetSQ, setTargetSQ] = useState<number[]>(Array(targetData.length).fill(startingBudget));
  const [probabilities, setProbabilities] = useState<number[]>(initialProbability);

  const handleChange = (index: number, targetData: TargetDataType) => (_event: Event, newValue: number | number[]) => {
    const targetCopy = [...targetSQ];
    const SQUsed = newValue as number;
    targetCopy[index] = SQUsed; // We will always be passing a number to state here
    setTargetSQ(targetCopy);
    const newProbabilities = [...probabilities];
    newProbabilities[index] = calcProbability({...targetData, sq: SQUsed});
    setProbabilities(newProbabilities);
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
        <span>{totalSQForBanner.toLocaleString('en-US')}</span>
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
                defaultValue={startingBudget}
                onChange={handleChange(index, item)}
                valueLabelDisplay="on"
                max={totalSQForBanner}
              />
              <h3>{t("rateup.chance.probability")}</h3>
              <h3>{probabilities[index]}</h3>
            </>)
            })
        }
        <div className="are-you-whale">
          <h1>{targetSQ.length && targetSQ.reduce((acc, current) => (acc + current), 0)}</h1>
          <h3>{targetSQ.length &&  totalSQForBanner - (targetSQ.reduce((acc, current) => (acc + current)))}</h3>
        </div>
      </div>
    </div>
  );
};

export default Probability;
