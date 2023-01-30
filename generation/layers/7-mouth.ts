import { getRandomIntInclusive } from "./common";

export async function getMouth() {
  const svgOpenTag = `<g id="Mouth">`;
  const svgCloseTag = `</g>`;

  const mouthOptions = [
    `<path d="M1839.46,610.2h0a298.61,298.61,0,0,0,171.26,54h13.83v-54" transform="translate(-1516.64 -12.28)" style="fill:#bb3f26" />
    <path d="M2210.76,609.92h0a298.59,298.59,0,0,1-171.25,54h-13.83v-54" transform="translate(-1516.64 -12.28)" style="fill:#a41e21" />
    <polygon points="507.9 567.07 484.77 543.93 315.11 597.92 507.9 597.92 507.9 567.07" style="fill:#6c1d10" />
    <polygon points="509.04 566.79 532.17 543.65 701.83 597.64 509.04 597.64 509.04 566.79" style="fill:#3e1c13" />`,
    `<rect x="291.72" y="579.93" width="426.58" height="58.17" style="fill:#553060" />
    <rect x="505.97" y="567.62" width="222.42" height="33.36" style="fill:#172028" />
    <path d="M691,567.31h2a12.92,12.92,0,0,1,12.92,12.92v20.44a0,0,0,0,1,0,0H678a0,0,0,0,1,0,0V580.23A12.92,12.92,0,0,1,691,567.31Z" style="fill:#f38bb0" />
    <rect x="505.66" y="628.47" width="183.49" height="22.24" style="fill:#172028" />
    <rect x="639.11" y="628.47" width="27.8" height="22.24" style="fill:#f38bb0" />
    <path d="M667.82,596v49.73h33.36A47.12,47.12,0,0,0,684,609.38Z" transform="translate(4.96 5.26)" style="fill:#f38bb0" />
    <path d="M712.3,579v55.6l12-10A59.37,59.37,0,0,0,745.67,579h0A16.68,16.68,0,0,0,729,562.36h0A16.68,16.68,0,0,0,712.3,579Z" transform="translate(4.96 5.26)" style="fill:#f38bb0" />
    <rect x="278.28" y="562.05" width="222.42" height="33.36" transform="translate(783.94 1162.72) rotate(-180)" style="fill:#172028" />
    <path d="M300.83,561.74h27.8a0,0,0,0,1,0,0v20.44a12.92,12.92,0,0,1-12.92,12.92h-2a12.92,12.92,0,0,1-12.92-12.92V561.74A0,0,0,0,1,300.83,561.74Z" transform="translate(634.43 1162.1) rotate(-180)" style="fill:#fac2c1" />
    <rect x="317.51" y="622.9" width="183.49" height="22.24" transform="translate(823.48 1273.31) rotate(-180)" style="fill:#172028" />
    <rect x="339.76" y="622.9" width="27.8" height="22.24" transform="translate(712.27 1273.31) rotate(-180)" style="fill:#fac2c1" />
    <path d="M333.89,595.72v49.73H300.52a47.15,47.15,0,0,1,17.17-36.38Z" transform="translate(4.96 5.26)" style="fill:#fac2c1" />
    <path d="M289.4,578.73v55.6l-12-10A59.37,59.37,0,0,1,256,578.73h0a16.68,16.68,0,0,1,16.68-16.68h0A16.68,16.68,0,0,1,289.4,578.73Z" transform="translate(4.96 5.26)" style="fill:#fac2c1" />
    <path d="M342.84,561.74h27.8a0,0,0,0,1,0,0v20.44a12.92,12.92,0,0,1-12.92,12.92h-2a12.92,12.92,0,0,1-12.92-12.92V561.74a0,0,0,0,1,0,0Z" transform="translate(718.45 1162.1) rotate(-180)" style="fill:#fac2c1" />
    <rect x="381.77" y="622.9" width="27.8" height="22.24" transform="translate(796.3 1273.31) rotate(-180)" style="fill:#fac2c1" />
    <path d="M383.72,561.74h27.8a0,0,0,0,1,0,0v20.44A12.92,12.92,0,0,1,398.6,595.1h-2a12.92,12.92,0,0,1-12.92-12.92V561.74A0,0,0,0,1,383.72,561.74Z" transform="translate(800.19 1162.1) rotate(-180)" style="fill:#fac2c1" />
    <rect x="422.64" y="622.9" width="27.8" height="22.24" transform="translate(878.04 1273.31) rotate(-180)" style="fill:#fac2c1" />
    <path d="M426.87,561.74h27.8a0,0,0,0,1,0,0v20.44a12.92,12.92,0,0,1-12.92,12.92h-2a12.92,12.92,0,0,1-12.92-12.92V561.74A0,0,0,0,1,426.87,561.74Z" transform="translate(886.5 1162.1) rotate(-180)" style="fill:#fac2c1" />
    <rect x="465.79" y="622.9" width="27.8" height="22.24" transform="translate(964.35 1273.31) rotate(-180)" style="fill:#fac2c1" />
    <path d="M472.26,561.74h27.8a0,0,0,0,1,0,0v20.44a12.92,12.92,0,0,1-12.92,12.92h-2a12.92,12.92,0,0,1-12.92-12.92V561.74A0,0,0,0,1,472.26,561.74Z" transform="translate(977.27 1162.1) rotate(-180)" style="fill:#fac2c1" />
    <rect x="507.8" y="623.52" width="27.8" height="22.24" transform="translate(1048.37 1274.55) rotate(-180)" style="fill:#f38bb0" />
    <rect x="549.82" y="623.52" width="27.8" height="22.24" transform="translate(1132.39 1274.55) rotate(-180)" style="fill:#f38bb0" />
    <rect x="590.69" y="623.52" width="27.8" height="22.24" transform="translate(1214.14 1274.55) rotate(-180)" style="fill:#f38bb0" />
    <rect x="633.84" y="623.52" width="27.8" height="22.24" transform="translate(1300.44 1274.55) rotate(-180)" style="fill:#f38bb0" />
    <path d="M504.43,561.74h27.8a0,0,0,0,1,0,0v20.44a12.92,12.92,0,0,1-12.92,12.92h-2a12.92,12.92,0,0,1-12.92-12.92V561.74A0,0,0,0,1,504.43,561.74Z" transform="translate(1041.62 1162.1) rotate(-180)" style="fill:#f38bb0" />
    <path d="M545.3,561.74h27.8a0,0,0,0,1,0,0v20.44a12.92,12.92,0,0,1-12.92,12.92h-2a12.92,12.92,0,0,1-12.92-12.92V561.74A0,0,0,0,1,545.3,561.74Z" transform="translate(1123.36 1162.1) rotate(-180)" style="fill:#f38bb0" />
    <path d="M588.45,561.74h27.8a0,0,0,0,1,0,0v20.44a12.92,12.92,0,0,1-12.92,12.92h-2a12.92,12.92,0,0,1-12.92-12.92V561.74A0,0,0,0,1,588.45,561.74Z" transform="translate(1209.67 1162.1) rotate(-180)" style="fill:#f38bb0" />
    <path d="M633.84,561.74h27.8a0,0,0,0,1,0,0v20.44a12.92,12.92,0,0,1-12.92,12.92h-2a12.92,12.92,0,0,1-12.92-12.92V561.74a0,0,0,0,1,0,0Z" transform="translate(1300.44 1162.1) rotate(-180)" style="fill:#f38bb0" />`,
    `<rect x="228.24" y="545" width="555.76" height="161.34" style="fill:#e73581" />
    <rect x="508.76" y="561.13" width="256.08" height="145.21"
      transform="translate(1270.96 1267.48) rotate(-180)" style="fill:#dcbabf" />
    <rect x="704.91" y="561.13" width="16.35" height="145.21"
      transform="translate(1423.52 1267.48) rotate(-180)" style="fill:#161f26" />
    <rect x="502.71" y="625.67" width="262.14" height="5.38"
      transform="translate(1264.91 1256.72) rotate(-180)" style="fill:#161f26" />
    <rect x="250.03" y="561.13" width="256.08" height="145.21" style="fill:#f0e2db" />
    <rect x="293.62" y="561.13" width="16.35" height="145.21" style="fill:#161f26" />
    <rect x="250.03" y="625.67" width="262.14" height="5.38" style="fill:#161f26" />
    <rect x="348.11" y="561.13" width="16.35" height="145.21" style="fill:#161f26" />
    <rect x="402.59" y="561.13" width="16.35" height="145.21" style="fill:#161f26" />
    <rect x="457.08" y="561.13" width="16.35" height="145.21" style="fill:#161f26" />
    <rect x="538.81" y="561.13" width="16.35" height="145.21" style="fill:#161f26" />
    <rect x="593.29" y="561.13" width="16.35" height="145.21" style="fill:#161f26" />
    <rect x="647.78" y="561.13" width="16.35" height="145.21" style="fill:#161f26" />
    <rect x="241.18" y="553.18" width="535.67" height="35.71"
      style="fill:#7814bd;opacity:0.34;mix-blend-mode:multiply" />
    <rect x="226.9" y="703.17" width="557.1" height="14.28" style="fill:#e73581" />
    <rect x="234.04" y="710.31" width="535.67" height="21.43"
      style="fill:#7814bd;opacity:0.34;mix-blend-mode:multiply" />`,
  ];

  const index = getRandomIntInclusive(0, mouthOptions.length - 1);
  console.log(`  Mouth: ${index}`);

  // TODO: generalize to `createSVG()` helper function
  const mouthSVG = `${svgOpenTag}${mouthOptions[index]}${svgCloseTag}`;

  return mouthSVG;
}
