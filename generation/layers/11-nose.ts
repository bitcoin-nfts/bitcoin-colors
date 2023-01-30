import { getRandomIntInclusive } from "./common";

export async function getNose() {
  const svgOpenTag = `<g id="Nose">`;
  const svgCloseTag = `</g>`;

  const noseOptions = [
    // NOSE 1
    `<path d="M515.59,360.78h0A111.68,111.68,0,0,1,627.27,472.46V598.54a0,0,0,0,1,0,0H403.92a0,0,0,0,1,0,0V472.46A111.68,111.68,0,0,1,515.59,360.78Z" style="fill:#883a62;opacity:0.7000000000000001" /><path d="M458.09,527.5h59.68V427.43H476.51a24.44,24.44,0,0,0-23,16.17l-18.42,51.17A24.45,24.45,0,0,0,458.09,527.5Z" transform="translate(9.03 13)" style="fill:#fa8cb2" /><circle cx="479.97" cy="487.27" r="18.01" style="fill:#542f5f" /><path d="M551.83,527.9H506.16V427.83h27.25a24.45,24.45,0,0,1,23,16.17l18.42,51.17A24.45,24.45,0,0,1,551.83,527.9Z" transform="translate(9.03 13)" style="fill:#f46461" /><circle cx="548.01" cy="486.55" r="18.01" style="fill:#172027" />`,
    // NOSE 2
    `<circle cx="478.44" cy="516.44" r="9.88" style="fill:#303636" /><path d="M503,519.73h-3.65a24.52,24.52,0,0,0-49,0H446.7a28.17,28.17,0,0,1,56.34,0Z" transform="translate(0.28 0)" style="fill:#efe1da" /><circle cx="535.24" cy="515.88" r="9.88" style="fill:#303636" /><path d="M510.08,519.17h3.66a24.52,24.52,0,0,1,49,0h3.66a28.18,28.18,0,0,0-56.35,0Z" transform="translate(0.28 0)" style="fill:#efe1da" />`,
    // NOSE 3
    `<path d="M543.92,542h0a37.42,37.42,0,0,1-37.42-37.42v-67h41.72a39.48,39.48,0,0,1,38.45,48.47l-6.31,27A37.43,37.43,0,0,1,543.92,542Z" transform="translate(0.28 0)" style="fill:#4d2f47" /><circle cx="543.71" cy="505.06" r="24.74" style="fill:#eb6447" /><circle cx="543.37" cy="505.4" r="18.3" style="fill:#3d2f39" /><path d="M469.21,541.7h0a37.42,37.42,0,0,0,37.42-37.42v-67H464.9a39.48,39.48,0,0,0-38.45,48.47l6.32,27A37.41,37.41,0,0,0,469.21,541.7Z" transform="translate(0.28 0)" style="fill:#883a62" /><circle cx="469.96" cy="504.76" r="24.74" style="fill:#eb6447" /><circle cx="470.3" cy="505.1" r="18.3" style="fill:#3d2f39" />`,
    // NOSE 4
    `<path d="M504.85,534.76l-99.51-59.7h0a108,108,0,0,1,95.7,7.67l3.81,2.28" transform="translate(-1.55 4)" style="fill:#4a3022" /><path d="M505.3,534.65l99.51-59.71h0a108,108,0,0,0-95.71,7.67l-3.8,2.28" transform="translate(-1.55 4)" style="fill:#021213" />`,
    // NOSE 5
    `<polyline points="464.53 419.86 439.16 525.62 506.81 525.62 506.81 404.19" style="fill:#f9c1c0" /><polygon points="439.16 525.62 506.81 525.62 506.81 541.29 439.16 525.62" style="fill:#f9c1c0" /><path d="M438.82,525.62h0c11,12.76,30.12,23.67,54.81,31.29l12.84,4V541.29Z" transform="translate(0.34)" style="fill:#883a62" /><polyline points="548.99 419.67 574.36 525.44 506.7 525.44 506.7 404" style="fill:#f489ae" /><polygon points="574.36 525.44 506.7 525.44 506.7 541.11 574.36 525.44" style="fill:#f489ae" /><path d="M574,525.44h0c-11,12.75-30.13,23.66-54.81,31.28l-12.85,4V541.11Z" transform="translate(0.34)" style="fill:#4d2f47" />`,
    // NOSE 6
    `<path d="M506.86,446.53V548.46h0a38.67,38.67,0,0,1-38-45.59l10.24-56.34Z" transform="translate(-1.66 0)" style="fill:#f55b20" /><path d="M505.88,446.53V548.46h0a38.67,38.67,0,0,0,38-45.59l-10.25-56.34Z" transform="translate(-1.66 0)" style="fill:#883a62" />`,
  ];

  const index = getRandomIntInclusive(0, noseOptions.length - 1);
  console.log(`  Nose: ${index}`);

  // TODO: generalize to `createSVG()` helper function
  const noseSVG = `${svgOpenTag}${noseOptions[index]}${svgCloseTag}`;

  return noseSVG;
}
