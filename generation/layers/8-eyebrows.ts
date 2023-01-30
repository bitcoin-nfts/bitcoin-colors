import { getRandomIntInclusive } from "./common";

export async function getEyebrows() {
  const svgOpenTag = `<g id="Eyebrows">`;
  const svgCloseTag = `</g>`;

  const eyebrowsOptions = [undefined];

  const index = getRandomIntInclusive(0, eyebrowsOptions.length - 1);
  console.log(`  Eyebrows: ${index}`);

  // TODO: generalize to `createSVG()` helper function
  const eyebrowsSVG = `${svgOpenTag}${eyebrowsOptions[index]}${svgCloseTag}`;

  return eyebrowsSVG;
}
