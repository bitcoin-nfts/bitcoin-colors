import { getRandomIntInclusive } from "./common";

export async function getEyebrows() {
  const svgOpenTag = `<g id="Eyebrows">`;
  const svgCloseTag = `</g>`;

  const eyebrowsOptions = [
    `<path d="M1711.8,303.43h237.5l-31.67-47.5h-84.77A151.22,151.22,0,0,0,1755,277.49Z" transform="translate(-1516.64 -12.28)" style="fill:#6c1d10" />
    <path d="M2312,305.71h-237.5l31.67-47.5H2191a151.2,151.2,0,0,1,77.82,21.56Z" transform="translate(-1516.64 -12.28)" style="fill:#3e1c13" />`,
    `<path d="M555,383.54V325.17a99.88,99.88,0,0,1,99.88-99.88H673.7" transform="translate(4.96 5.26)" style="fill:none;stroke:#eadfdb;stroke-linecap:round;stroke-miterlimit:10;stroke-width:4px;mix-blend-mode:overlay" />
    <path d="M546.17,383.16V320.63a107,107,0,0,1,107-107h20.15" transform="translate(4.96 5.26)" style="fill:none;stroke:#eadfdb;stroke-linecap:round;stroke-miterlimit:10;stroke-width:4px;mix-blend-mode:overlay" />
    <path d="M526.79,383.68V311.77A123.06,123.06,0,0,1,649.84,188.71H673" transform="translate(4.96 5.26)" style="fill:none;stroke:#eadfdb;stroke-linecap:round;stroke-miterlimit:10;stroke-width:4px;mix-blend-mode:overlay" />
    <path d="M454.37,383.54V325.17a99.88,99.88,0,0,0-99.88-99.88h-18.8" transform="translate(4.96 5.26)" style="fill:none;stroke:#eadfdb;stroke-linecap:round;stroke-miterlimit:10;stroke-width:4px;mix-blend-mode:overlay" />
    <path d="M463.21,383.16V320.63a107,107,0,0,0-107-107H336.06" transform="translate(4.96 5.26)" style="fill:none;stroke:#eadfdb;stroke-linecap:round;stroke-miterlimit:10;stroke-width:4px;mix-blend-mode:overlay" />
    <path d="M482.6,383.68V311.77A123.07,123.07,0,0,0,359.54,188.71H336.37" transform="translate(4.96 5.26)" style="fill:none;stroke:#eadfdb;stroke-linecap:round;stroke-miterlimit:10;stroke-width:4px;mix-blend-mode:overlay" />`,
    undefined,
  ];

  const index = getRandomIntInclusive(0, eyebrowsOptions.length - 1);
  console.log(`  Eyebrows: ${index}`);

  // TODO: generalize to `createSVG()` helper function
  const eyebrowsSVG = `${svgOpenTag}${eyebrowsOptions[index]}${svgCloseTag}`;

  return eyebrowsSVG;
}
