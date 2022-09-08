import { NextPage } from "next";
import Image from "next/image";
import { useContext, useState } from "react";
import { FgoContext, TargetOptions } from "../contexts";
import { Slider } from "@mui/material";
import { TargetDataType } from "../types/contexts";
import calcProbability from "../utils/calcProbability";
import copy from "../data/copy";
import servantData from "../data/servantData";
import { fiveStarMarks, fourStarMarks } from "../data/servantnpdata";
import classNames from 'classnames';
import Footer from "./components/footer";

const Probability: NextPage = () => {
  const { state } = useContext(FgoContext);
  const { totalSQForBanner, targetData } = state;
  const startingBudget = Math.floor(totalSQForBanner / targetData.length);
  const initialProbability: number[] = [];
  targetData.forEach((item) => initialProbability.push(calcProbability({...item, sq: startingBudget})));
  const [targetSQ, setTargetSQ] = useState<number[]>(Array(targetData.length).fill(startingBudget));
  const [probabilities, setProbabilities] = useState<number[]>(initialProbability);
  const totalSpent = targetSQ.reduce((acc, current) => (acc + current), 0);

  const handleChange = (index: number, targetData: TargetDataType) => (_event: Event, newValue: number | number[]) => {
    const targetCopy = [...targetSQ];
    const SQUsed = newValue as number;
    targetCopy[index] = SQUsed; // We will always be passing a number to state here
    setTargetSQ(targetCopy);
    const newProbabilities = [...probabilities];
    newProbabilities[index] = calcProbability({...targetData, sq: SQUsed});
    setProbabilities(newProbabilities);
  };

  const getNpMarks = (rarity: number) => {
    if (rarity === 5) {
      return fiveStarMarks;
    } else if (rarity === 4) {
      return fourStarMarks;
    } else {
      return []
    }
  }

  return (
    <div className="probability-container">
      <div className="total-sq">
        <h2>{copy["sq"]["future"]}</h2>
        <Image
          src="/saintquartz.svg"
          alt="saintquartz"
          height={36}
          width={36}
        />
        <span>{totalSQForBanner.toLocaleString('en-US')}</span>
      </div>
      <div className="subheader">{copy["rateup"]["chance"]["subheader"]}<span className="probabilityDisclaimer">{copy["rateup"]["chance"]["subheaderDisclaimer"]}</span></div>
      <div className="probability-calculations">
        {
        targetData.map((item, index) => {
            const typeCopy =
            item.type === TargetOptions.ce ? copy["craftessence"] : copy["servant"];
            const servantName = item.name || "";
            return (
            <div key={item.name} className="target-calc">
              <div className="target-name">{item.name}</div>
              <div>{`${item.rarity}* ${typeCopy}`}</div>
              <div className="target-prob-container">
                <Slider
                  aria-label="calculatedprobability"
                  defaultValue={startingBudget}
                  onChange={handleChange(index, item)}
                  valueLabelDisplay="on"
                  max={totalSQForBanner}
                  marks={getNpMarks(item.rarity)}
                />
                <div className="target-prob-box">
                  {copy["rateup"]["chance"]["probability"]}
                  <div className="target-prob-percent">{`${probabilities[index]}%`}</div>
                </div>
              </div>
              <div className="banners">
                <div className="banner-copy">{copy["bannerlist"]}</div>
                {servantData[servantName as keyof typeof servantData] &&
                servantData[servantName as keyof typeof servantData].map((banner) => (
                  <div key={banner[0]}>{`${banner[0]}: ${banner[1]}`}</div>
                ))
                }
              </div>
            </div>)
            })
        }
        <div className="are-you-a-whale">
          <div className="spendings">
            <div>{copy["totalspent"]}</div>
            <div className="sq-spent">
              <Image
                src="/saintquartz.svg"
                alt="saintquartz"
                height={36}
                width={36}
              />
              <span className="total-spent">{targetSQ.length && targetSQ.reduce((acc, current) => (acc + current), 0)}</span>
            </div>
            <div className={classNames({'yea-a-whale': targetSQ.length && ((totalSQForBanner - totalSpent) < 0), 'not-a-whale': targetSQ.length && ((totalSQForBanner - totalSpent) > 0)})}>{`(${targetSQ.length &&  totalSQForBanner - totalSpent})`}</div>
          </div>
        </div>
      </div>
      <Footer stepNum={3} linkTo="/" linkBack="/rolltarget" />
      <div className="credits-container">
        <Image
          layout="fixed"
          src="/eresh-cropped.png"
          alt="smol-ereshkigal"
          height={157}
          width={125}
        />
      <div className="credits">
          <span>{copy["credits"]["banners"]}</span>
          <a href="https://docs.google.com/spreadsheets/d/1rKtRX3WK9ZpbEHhDTy7yGSxYWIav1Hr_KhNM0jWN2wc/edit#gid=0">{copy["credits"]["bannersLink"]}</a>
          <span>{copy["credits"]["event"]}</span>
          <a href="https://docs.google.com/spreadsheets/d/1qvxLU407QwiFaCvItqR16SqqAVlLD5u5nBzY_bCFYvs/edit#gid=2111060397">{copy["credits"]["eventLink"]}</a>
          <span>{copy["credits"]["wiki"]}</span>
          <a href="https://fategrandorder.fandom.com/wiki/Fate/Grand_Order_Wikia">{copy["credits"]["wikiLink"]}</a>

        </div>
      </div>
      <div className="disclaimer">
        <span>{copy["disclaimer"]}</span>
        <a href="mailto:fategrandsavings@gmail.com">
          {copy["contact"]}
        </a>
      </div>
    </div>
  );
};

export default Probability;
