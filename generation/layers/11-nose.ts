import { getRandomIntInclusive } from "./common";

export async function getNose() {
  const svgOpenTag = `<g id="Nose">`;
  const svgCloseTag = `</g>`;

  const noseOptions = [
    `<path d="M563.25,543.74h0A55.21,55.21,0,0,1,508,488.53V389.74H569.6a58.25,58.25,0,0,1,56.72,71.51L617,501.1A55.22,55.22,0,0,1,563.25,543.74Z" transform="translate(4.96 5.26)" style="fill:#4e3047" />
    <circle cx="567" cy="495" r="27" style="fill:#3e2f39" />
    <path d="M453,543.29h0a55.21,55.21,0,0,0,55.21-55.21V389.29H446.67A58.26,58.26,0,0,0,390,460.81l9.31,39.84A55.2,55.2,0,0,0,453,543.29Z" transform="translate(4.96 5.26)" style="fill:#893c63" />
    <circle cx="459.19" cy="494.55" r="27" style="fill:#3e2f39" />
    <circle cx="567.5" cy="494.5" r="36.5" style="fill:#ec6547" />
    <circle cx="458.69" cy="494.05" r="36.5" style="fill:#ec6547" />`,
    `<polyline points="461.55 419.86 436.17 525.62 503.83 525.62 503.83 404.19"
    style="fill:#fac2c1" />
  <polygon points="436.17 525.62 503.83 525.62 503.83 541.29 436.17 525.62" style="fill:#fac2c1" />
  <path d="M438.82,525.62h0c11,12.76,30.12,23.67,54.81,31.29l12.84,4V541.29Z"
    transform="translate(-2.64 0)" style="fill:#893a62" />
  <polyline points="546 419.67 571.38 525.44 503.72 525.44 503.72 404" style="fill:#f58aaf" />
  <polygon points="571.38 525.44 503.72 525.44 503.72 541.11 571.38 525.44" style="fill:#f58aaf" />
  <path d="M574,525.44h0c-11,12.75-30.13,23.66-54.81,31.28l-12.85,4V541.11Z"
    transform="translate(-2.64 0)" style="fill:#4d2f47" />`,
    undefined,
  ];

  const index = getRandomIntInclusive(0, noseOptions.length - 1);
  console.log(`  Nose: ${index}`);

  // TODO: generalize to `createSVG()` helper function
  const noseSVG = `${svgOpenTag}${noseOptions[index]}${svgCloseTag}`;

  return noseSVG;
}
