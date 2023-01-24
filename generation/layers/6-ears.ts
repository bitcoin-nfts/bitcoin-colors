import { getRandomIntInclusive } from "./common";

export async function getEars() {
  const svgOpenTag = `<g id="Ears">`;
  const svgCloseTag = `</g>`;

  const earsOptions = [
    `<path d="M1839.6,188.25l-5.94-23.07c-15.25-59.3-86.93-82.68-134.21-43.78l-94.06,77.38,136.67,33.28,65.18-53.62,17.87,21.73" transform="translate(-1516.64 -12.28)" style="fill:#bb3f26" />
  <polygon points="320.31 203.1 296.48 174.13 318.21 156.26 327.55 197.14 320.31 203.1" style="fill:#bb3f26" />
  <path d="M2211,188.92l5.93-23.07c15.25-59.29,86.93-82.67,134.21-43.78l94.06,77.38-136.67,33.28-65.18-53.62-17.87,21.73" transform="translate(-1516.64 -12.28)" style="fill:#a41e21" />
  <polygon points="697.01 203.77 720.84 174.81 699.12 156.93 689.77 197.81 697.01 203.77" style="fill:#bb3f26" />`,
    `<path d="M305.87,186.89v64a22.68,22.68,0,0,1-22.69,22.68H262.37a97.65,97.65,0,0,0-37.56,7.52h0a87.11,87.11,0,0,1-112.14-43l-4.43-9.28A86.59,86.59,0,0,1,152.31,112h0a86.54,86.54,0,0,1,56.42-4.08L298,131.74H187.69a39.4,39.4,0,0,0-39.39,39.39h0a39.4,39.4,0,0,0,39.39,39.4h4.85a39.36,39.36,0,0,0,20.27-5.62l40.76-24.46a42.82,42.82,0,0,1,52.3,6.44Z" transform="translate(4.96 5.26)" style="fill:#553060" />
    <path d="M722.86,187.1v64a22.69,22.69,0,0,0,22.69,22.69h20.81a97.64,97.64,0,0,1,37.56,7.51h0a87.1,87.1,0,0,0,112.15-43l4.42-9.28a86.59,86.59,0,0,0-44.07-116.81h0A86.58,86.58,0,0,0,820,108.15L730.74,132H841a39.38,39.38,0,0,1,39.39,39.39h0A39.39,39.39,0,0,1,841,210.74h-4.85a39.39,39.39,0,0,1-20.26-5.61l-40.77-24.46a42.81,42.81,0,0,0-52.3,6.43Z" transform="translate(4.96 5.26)" style="fill:#151e12" />`,
  ];

  const index = getRandomIntInclusive(0, earsOptions.length - 1);
  console.log(`  Ears: ${index}`);

  // TODO: generalize to `createSVG()` helper function
  const earsSVG = `${svgOpenTag}${earsOptions[index]}${svgCloseTag}`;

  return earsSVG;
}
