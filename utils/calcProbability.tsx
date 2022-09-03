import { TargetDataType } from "../types/contexts";

// The index of the array indicates the rarity of the target, i.e. fgoProbabilities.SERVANT[5] = 0.008
const fgoProbabilities = {
  CE: [0,0,0,0.08,0.04,0.028],
  SERVANT: [0,0,0,0.04,0.015,0.008]
};


const calcProbability = ({ sq, type, rarity, shared = 1 }: TargetDataType & {sq: number}): number => {
  const summonProbability = fgoProbabilities[type as keyof typeof fgoProbabilities][rarity]/shared;
  const rolls = sq/3;
  const exponent = (rolls+(rolls/10));
  const result = 1-Math.pow((1-summonProbability), exponent);
  return Math.round(result*100);
};

export default calcProbability;
