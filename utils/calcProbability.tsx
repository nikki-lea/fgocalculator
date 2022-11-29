import { TargetOptions } from "../contexts";
import { TargetDataType } from "../types/contexts";

// The index of the array indicates the rarity of the target, i.e. fgoProbabilities.SERVANT[5] = 0.008
const fgoProbabilities = {
  CE: [0,0,0,0.08,0.04,0.028],
  SERVANT: [0,0,0,0.04,0.015,0.008]
};

function customFact(n: number): number {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return customFact(n - 1) * n;
}


const calcProbability = ({ sq, type, rarity, shared = 1, np = 1 }: TargetDataType & {sq: number, np: number}): number => {
  if (!sq || !type || !rarity) {
    return 0;
  }
  const summonProbability = fgoProbabilities[type as keyof typeof fgoProbabilities][rarity]/shared;
  const rolls = sq/3;
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
    for (let i = np; i < rolls; i++) {
      const combination =
        customFact(rolls) / (customFact(i) * customFact(rolls - i));
      const currentProbability =
        combination * (0.008**i) * (0.992**(rolls - i));
      cumulativeProbability = cumulativeProbability + currentProbability;
    }
    return cumulativeProbability;
  }
};

export default calcProbability;
