import { getRandomIntInclusive } from "./common";

export async function getEyebrows() {
  const eyebrowsOptions = [undefined];

  const index = getRandomIntInclusive(0, eyebrowsOptions.length - 1);
  console.log(`  Eyebrows: ${index}`);

  const svgOpenTag = `<g id="Eyebrows-${index + 1}">`;
  const svgCloseTag = `</g>`;
  const eyebrowsSVG = `${svgOpenTag}${eyebrowsOptions[index]}${svgCloseTag}`;

  return eyebrowsSVG;
}
