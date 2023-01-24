export { getBackground } from "./1-background";
export { getBody } from "./2-body";
export { getHead } from "./3-head";
export { getFaceAccessory } from "./4-face-accessory";
export { getEarrings } from "./5-earrings";
export { getEars } from "./6-ears";
export { getMouth } from "./7-mouth";
export { getEyebrows } from "./8-eyebrows";
export { getGlasses } from "./9-glasses";
export { getEyes } from "./10-eyes";
export { getNose } from "./11-nose";
export { getHat } from "./12-hat";

export interface BitcoinFace {
  background: string;
  body: string;
  head: string;
  ears: string;
  mouth: string;
  eyes: string;
  nose: string;
  eyebrows?: string;
  faceAccessory?: string;
  earrings?: string;
  glasses?: string;
  hat?: string;
}

// credit: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
