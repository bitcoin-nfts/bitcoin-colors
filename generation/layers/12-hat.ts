import { getRandomIntInclusive } from "./common";

export async function getHat() {
  const svgOpenTag = `<g id="Hat">`;
  const svgCloseTag = `</g>`;

  const hatOptions = [
    `<path d="M700.6,287.1l91.71-115.5v36.08c0,25.56-20.29,49.43-54.06,63.61Z" transform="translate(4.96 5.26)" style="fill:#de4926" />
    <path d="M328.77,285.73,237.06,170.22v36.09c0,25.56,20.29,49.43,54.06,63.61Z" transform="translate(4.96 5.26)" style="fill:#f26227" />
    <path d="M483.31,227.36v-154l-10.83,6.82c-61.55,38.76-61.55,101.61,0,140.37Z" transform="translate(4.96 5.26)" style="fill:#bc3373" />
    <polyline points="488.26 232.62 365.99 136.37 365.99 194.12 488.26 290.37" style="fill:#8f98c5" />
    <path d="M361,188.86V15.6L324.34,61.82c-36.18,45.56-55,95.8-55,146.75v57.29h196" transform="translate(4.96 5.26)" style="fill:#bc3373" />
    <path d="M546.07,228.73v-154l10.82,6.82c61.55,38.76,61.55,101.61,0,140.37Z" transform="translate(4.96 5.26)" style="fill:#542e5b" />
    <polyline points="551.03 233.99 673.3 137.74 673.3 195.49 551.03 291.74" style="fill:#4f5090" />
    <path d="M668.34,190.23V17L705,63.19c36.18,45.57,55,95.81,55,146.75v57.29H565.92" transform="translate(4.96 5.26)" style="fill:#542e5b" />
    <path d="M483.31,227.36,391.6,111.85v36.09c0,25.56,20.29,49.43,54.06,63.61Z" transform="translate(4.96 5.26)" style="fill:#f26227" />
    <path d="M546.07,228.73l91.7-115.5v36.08c0,25.56-20.28,49.43-54.06,63.61Z" transform="translate(4.96 5.26)" style="fill:#de4926" />
    <circle cx="520.46" cy="230.24" r="67.19" style="fill:#f26227" />
    <circle cx="520.45" cy="230.24" r="58.81" style="fill:#d74b27" />`,
  ];

  const index = getRandomIntInclusive(0, hatOptions.length - 1);
  console.log(`  Hat: ${index}`);

  // TODO: generalize to `createSVG()` helper function
  const hatSVG = `${svgOpenTag}${hatOptions[index]}${svgCloseTag}`;

  return hatSVG;
}
