import { getRandomIntInclusive } from "./common";

export async function getBody() {
  const svgOpenTag = `<g id="Body">`;
  const svgCloseTag = `</g>`;

  const bodyOptions = [
    // BODY 1
    `<rect y="527.13" width="1010" height="474.67" style="fill:#001a1b" /><rect x="230.99" y="648.68" width="558.75" height="355.32" style="fill:#bcafb1" /><rect x="421.53" y="575.39" width="167.41" height="428.61" style="fill:#172027" />`,
    // BODY 2
    `<polyline points="0 466.21 187.39 280.34 187.39 552.6" style="fill:#545290" /><polyline points="1010 464.81 824.02 280 824.02 542.9" style="fill:#545290" /><rect y="464.72" width="1009.59" height="535.86" style="fill:#545290" /><rect x="186.39" y="280.34" width="637.63" height="202.05" style="fill:#545290" />`,
    // BODY 3
    `<polygon points="964.21 1008.46 48.77 1008.46 121.96 256.43 890.62 256.43 964.21 1008.46" style="fill:#af3271" />`,
    // BODY 4
    `<path d="M504,494.22h0A412.66,412.66,0,0,1,916.61,906.88V1003a0,0,0,0,1,0,0H91.3a0,0,0,0,1,0,0V906.88A412.66,412.66,0,0,1,504,494.22Z" style="fill:#6c1908" />`,
    // BODY 5
    `<path d="M197.15,184.18H813.85A197.15,197.15,0,0,1,1011,381.33v623.52a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V381.33A197.15,197.15,0,0,1,197.15,184.18Z" style="fill:#111c0d" />`,
    // BODY 6
    `<rect x="299.41" y="680.41" width="414.66" height="319.69" style="fill:#383838" /><rect x="501.93" y="685.27" width="211.14" height="314.83" style="fill:#7814bc;opacity:0.64;mix-blend-mode:multiply" /><path d="M209.23,1000.1h-71v-90c0-94,76.48-170.5,170.5-170.5v71a99.61,99.61,0,0,0-99.5,99.5Z" transform="translate(-0.66)" style="fill:#df2d2c" /><path d="M875.73,1000.1h-71v-90a99.62,99.62,0,0,0-99.5-99.5v-71c94,0,170.5,76.49,170.5,170.5Z" transform="translate(-0.66)" style="fill:#c12e58" /><rect x="272.07" y="730.1" width="45" height="108" style="fill:#383838" /><rect x="695.07" y="730.1" width="45" height="108" style="fill:#383838" />`,
    // BODY 7
    `<rect x="205.14" y="470" width="615.55" height="543.18" style="fill:#a02a15" /><rect x="205.85" y="982.74" width="612" height="30.44" style="fill:#de2f7a" /><rect x="205.85" y="944.69" width="612" height="30.44" style="fill:#de2f7a" /><rect x="205.85" y="906.63" width="612" height="30.44" style="fill:#de2f7a" /><rect x="205.85" y="868.58" width="612" height="30.44" style="fill:#de2f7a" /><rect x="205.85" y="830.53" width="612" height="30.44" style="fill:#de2f7a" /><rect x="205.85" y="792.48" width="612" height="30.44" style="fill:#de2f7a" /><rect x="205.85" y="754.43" width="612" height="30.44" style="fill:#de2f7a" /><rect x="205.85" y="716.37" width="612" height="30.44" style="fill:#de2f7a" /><rect x="205.85" y="678.32" width="612" height="30.44" style="fill:#de2f7a" /><rect x="205.85" y="640.27" width="612" height="30.44" style="fill:#de2f7a" /><rect x="205.85" y="602.22" width="612" height="30.44" style="fill:#de2f7a" /><rect x="205.85" y="564.17" width="612" height="30.44" style="fill:#de2f7a" /><rect x="508.8" y="509.31" width="312.26" height="503.87" style="fill:#7814bc;opacity:0.34;mix-blend-mode:multiply" />`,
    // BODY 8
    `<rect x="161.21" y="452.66" width="687.79" height="552.16" style="fill:#ba3d11" /><rect x="309.41" y="451.15" width="382.27" height="553.67" style="fill:#542f5f" /><rect x="500.36" y="451.15" width="194.64" height="553.67" style="fill:#172027" />`,
  ];

  const index = getRandomIntInclusive(0, bodyOptions.length - 1);
  console.log(`  Body: ${index}`);

  const bodySVG = `${svgOpenTag}${bodyOptions[index]}${svgCloseTag}`;

  return bodySVG;
}
