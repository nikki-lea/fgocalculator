import { NextPage } from "next";
import Image from "next/future/image";
import { useContext, useEffect, useState } from "react";
import debounce from 'lodash.debounce';
import { FgoContext, TargetOptions } from "../contexts";
import { MenuItem, Select, SelectChangeEvent, Slider } from "@mui/material";
import { TargetDataType } from "../types/contexts";
import calcProbability from "../utils/calcProbability";
import copy from "../data/copy";
import servantData from "../data/servantData";
import classNames from 'classnames';
import Footer from "./components/footer";
import { useResizeDetector } from 'react-resize-detector';
import calcTotalSQForDate from "../utils/calcTotalSQForDate";
import moment from "moment";

const Probability: NextPage = () => {
  const { state } = useContext(FgoContext);
  const {
    totalSQForBanner,
    targetData,
    excludeOptions,
    cumulativeLoginsCount,
    currentTickets,
    monthlyShopTickets,
    startDate,
    endDate,
    questSQ,
    currentSQ
   } = state;
  const startingBudget = Math.floor(totalSQForBanner / targetData.length);
  const initialProbability: number[] = [];
  targetData.forEach((item) => initialProbability.push(calcProbability({...item, sq: startingBudget})));
  const [targetSQ, setTargetSQ] = useState<number[]>(Array(targetData.length).fill(startingBudget));
  const [probabilities, setProbabilities] = useState<number[]>(initialProbability);
  const [npSettings, setNpSettings] = useState<number[]>([]);
  const totalSpent = targetSQ.reduce((acc, current) => (acc + current), 0);
  const { ref } = useResizeDetector();

  const handleProbabilityChange = (index: number, targetData: TargetDataType, npUpdate: number = 0) => (_event: Event, newValue: number | number[]) => {
    const targetCopy = [...targetSQ];
    const SQUsed = newValue as number;
    targetCopy[index] = SQUsed; // We will always be passing a number to state here
    setTargetSQ(targetCopy);
    const newProbabilities = [...probabilities];
    let npSetting = npUpdate ? npUpdate : npSettings[index];
    newProbabilities[index] = calcProbability({...targetData, sq: SQUsed, np: npSetting});
    setProbabilities(newProbabilities);
  };

  const handleNpChange = (index: number, targetData: TargetDataType) => (event: SelectChangeEvent) => {
    let npSetting = 1;
    try {
      npSetting = parseInt(event.target.value)
    } catch (e) {
      console.log('Np set to invalid value');
    }
    let npSettingsCopy = [...npSettings];
    npSettingsCopy[index] = npSetting;
    setNpSettings(npSettingsCopy);
    handleProbabilityChange(index, targetData, npSetting)(new Event(''), targetSQ[index]);
  }

  return (
    <div className="probability-container">
      <div className="total-sq">
        <h2>{copy["sq"]["future"]}</h2>
        <Image
          src="/saintquartz.svg"
          alt="fgo sq calculator sq image"
          style={{
            flexShrink: 0,
            height: "24px",
            width: "24px"
          }}
        />
        <span>{totalSQForBanner.toLocaleString('en-US')}</span>
      </div>
      <div className="subheader">{copy["rateup"]["chance"]["subheader"]}</div>
      <div className="probability-calculations" ref={ref}>
        {
        targetData.map((item, index) => {
            const typeCopy =
            item.type === TargetOptions.ce ? copy["craftessence"] : copy["servant"];
            const servantName = item.name || "";
            let maxSQForBanner = totalSQForBanner;
            let targetBannerDate;
            let startDateAsMoment: moment.Moment;
            let endDateAsMoment = moment(endDate, "YYYY-MM-DD");
            let bannerDate;
            if (item.type === TargetOptions.servant) {
              startDateAsMoment = moment(startDate, "YYYY-MM-DD");
              const targetBanner = servantData[servantName as keyof typeof servantData] ?
              servantData[servantName as keyof typeof servantData].find(banner => {
                bannerDate = moment(banner[1], "YYYY/MM/DD");
                return bannerDate.isAfter(startDateAsMoment)
              }) : "";
              targetBannerDate = targetBanner ? targetBanner[1] : "";
              maxSQForBanner = targetBannerDate ? calcTotalSQForDate({
                excludeOptions,
                currentSQ,
                currentTickets,
                cumulativeLoginsCount,
                monthlyShopTickets,
                startDate,
                endDate: targetBannerDate,
                questSQ
              }) : 0;
            }
            return (
            <div key={item.name} className="target-calc">
              <div className="target-settings">
              <div className="target-name">{item.name}</div>
                {item.type === TargetOptions.servant &&
                  <Select
                    labelId="np-setting"
                    id="np-setting"
                    value={npSettings[index] ? npSettings[index].toString() : '1'}
                    label="Np Setting"
                    onChange={handleNpChange(index, item)}
                    sx={{marginLeft: "20px", height: "20px", fontSize: "12px"}}
                  >
                    <MenuItem sx={{fontSize: "12px", height: "20px"}} value={1}>NP1</MenuItem>
                    <MenuItem sx={{fontSize: "12px", height: "20px"}} value={2}>NP2</MenuItem>
                    <MenuItem sx={{fontSize: "12px", height: "20px"}} value={3}>NP3</MenuItem>
                    <MenuItem sx={{fontSize: "12px", height: "20px"}} value={4}>NP4</MenuItem>
                    <MenuItem sx={{fontSize: "12px", height: "20px"}} value={5}>NP5</MenuItem>
                  </Select>
                }
              </div>
              {item.type === TargetOptions.servant && <div>{`${item.rarity}* ${typeCopy} - Max ${maxSQForBanner} SQ available by ${targetBannerDate}`}</div>}
              {item.type === TargetOptions.ce && <div>{`${item.rarity}* ${typeCopy}`}</div>}
              { item.type === TargetOptions.ce || (item.type === TargetOptions.servant && (endDateAsMoment.add(2, "days")).isAfter(bannerDate)) ?
              (<div className="target-prob-container">
                <Slider
                  aria-label="calculatedprobability"
                  defaultValue={startingBudget}
                  onChange={debounce(handleProbabilityChange(index, item), 100)}
                  valueLabelDisplay="on"
                  max={maxSQForBanner < 4000 ? maxSQForBanner : 4000}
                />
                <div className="target-prob-box">
                  {copy["rateup"]["chance"]["probability"]}
                  <div className="target-prob-percent">{`${Math.floor(probabilities[index])}%`}</div>
                </div>
              </div>
              ) : (<div className="invalid-date">{copy["dateinvalid"]}</div>)}
              {item.type === TargetOptions.servant &&
                <div className="banners">
                  <div className="banner-copy">{copy["bannerlist"]}</div>
                  {servantData[servantName as keyof typeof servantData] &&
                  servantData[servantName as keyof typeof servantData].map((banner) => {
                        const bannerDateAsMoment = moment(banner[1], "YYYY/MM/DD");
                        if (bannerDateAsMoment.isAfter(startDateAsMoment))
                        return (
                          <div key={banner[0]}>{`${banner[0]}: ${banner[1]}`}</div>
                        )
                      }
                    )
                  }
                </div>
              }
            </div>)
            })
        }
        <div className="are-you-a-whale">
          <div className="spendings">
            <div>{copy["totalspent"]}</div>
            <div className="sq-spent">
              <Image
                src="/saintquartz.svg"
                alt="fgo sq calculator sq image"
                height={24}
                width={24}
              />
              <span className="total-spent">{targetSQ.length && targetSQ.reduce((acc, current) => (acc + current), 0)}</span>
            </div>
            <div className={classNames({'yea-a-whale': targetSQ.length && ((totalSQForBanner - totalSpent) < 0), 'not-a-whale': targetSQ.length && ((totalSQForBanner - totalSpent) > 0)})}>{`(${targetSQ.length &&  totalSQForBanner - totalSpent})`}</div>
          </div>
        </div>
      </div>
      <Footer stepNum={3} linkTo="/" linkBack="/rolltarget" />
      <div className="probabilityDisclaimer">{copy["rateup"]["chance"]["subheaderDisclaimer"]}</div>
      <div className="credits-container">
        <Image
          src="/eresh-cropped.png"
          alt="fgo sq savings calculator small ereshkigal"
          style={{
            flexShrink: 0,
            height: "100px",
            width: "80px"
          }}
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
