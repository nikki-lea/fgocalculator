import Big from 'big.js';
import { TargetOptions } from "../contexts";
import { TargetDataType } from "../types/contexts";
import {ProbabilityMemoType, NPType, probabilityMemo} from '../data/probabilityMemo';

// The index of the array indicates the rarity of the target, i.e. fgoProbabilities.SERVANT[5] = 0.008
const fgoProbabilities = {
  CE: [0,0,0,0.08,0.04,0.028],
  SERVANT: [0,0,0,0.04,0.015,0.008]
};

const customFactorial = (n: number): bigint => {
  let result = BigInt(n);
  for (let i = BigInt(n - 1); i > BigInt(0); i = i - BigInt(1)) {
    result = result * i;
  }
  return result;
}


const calcProbability = ({ sq, type, rarity, shared = 1, np = 1 }: TargetDataType & {sq: number, np?: number}): number => {
  if (!sq || !type || !rarity) {
    return 0;
  }
  const summonProbability = fgoProbabilities[type as keyof typeof fgoProbabilities][rarity]/shared;
  const rolls = Math.floor(sq/3);
  if (np <= 1) {
    // 100% guarantee of SSR after 900 SQ spent
    if (type === TargetOptions.servant && rarity === 5 && sq >= 900) {
      return 100;
    }
    const exponent = (rolls+(rolls/10));
    const result = 1-Math.pow((1-summonProbability), exponent);
    return Math.round(result*100);
  } else {
    let cumulativeProbability = 0;
    const rarityKey = rarity === 5 ? "SSR" : "SR";
    const npKey = `np${np}`;
    console.log(probabilityMemo[rarityKey as keyof ProbabilityMemoType][npKey as keyof NPType][sq])
    if (shared === 1 && probabilityMemo[rarityKey as keyof ProbabilityMemoType][npKey as keyof NPType][sq]) {
      cumulativeProbability =  probabilityMemo[rarityKey as keyof ProbabilityMemoType][npKey as keyof NPType][sq];
    } else {
      for (let i = np; i < rolls; i++) {
        const combination =
        customFactorial(rolls) / (customFactorial(i) * customFactorial(rolls - i));
        const currentCombinationAsBig = Big(combination.toString())
        const currentProbability =
          currentCombinationAsBig.mul(Big(0.008).pow(i)).mul(Big(0.992).pow(rolls - i));
        const currentProbabilityTruncated = currentProbability.toFixed(4);
        cumulativeProbability = cumulativeProbability + parseFloat(currentProbabilityTruncated);
      }
    }
    return (cumulativeProbability*100);
  }
};

export default calcProbability;
