import { getRandomIntInclusive } from "./common";

export async function getEyes() {
  const svgOpenTag = `<g id="Eyes">`;
  const svgCloseTag = `</g>`;

  const eyesOptions = [
    `<circle cx="356.6" cy="399.4" r="104.44" style="fill:#071c1d" />
    <circle cx="356.6" cy="399.4" r="64.65" style="fill:#f0e2db" />
    <circle cx="356.6" cy="399.4" r="44.76" style="fill:#ed7e29" />
    <polyline points="361.58 345.25 361.58 385.03 396.39 350.22" style="fill:#f0e2db" />
    <circle cx="356.84" cy="399.23" r="74.77" style="fill:none;stroke:#893c63;stroke-miterlimit:10;stroke-width:4px" />
    <circle cx="674.77" cy="396.17" r="104.44" style="fill:#071c1d" />
    <circle cx="674.77" cy="396.17" r="64.65" style="fill:#f0e2db" />
    <circle cx="674.77" cy="396.17" r="44.76" style="fill:#ed7e29" />
    <polyline points="679.74 342.01 679.74 381.8 714.55 346.99" style="fill:#f0e2db" />
    <circle cx="675" cy="396" r="74.77" style="fill:none;stroke:#893c63;stroke-miterlimit:10;stroke-width:4px" />
    <polyline points="754.2 330.06 849.91 406.62 754.2 406.62" style="fill:#071c1d" />
    <polyline points="275.45 330.06 179.74 406.62 275.45 406.62" style="fill:#071c1d" />`,
    `<circle cx="369.39" cy="418.01" r="105.81" style="fill:#24181f" />
    <circle cx="370.55" cy="416.85" r="73" style="fill:#f0c339" />
    <circle cx="370.55" cy="416.85" r="43.47" style="fill:#e79e2d" />
    <rect x="1842.9" y="413.21" width="88.59" height="29.53" rx="9" transform="translate(-661.27 -1221.38) rotate(45)" style="fill:#3e2f39" />
    <rect x="1857.67" y="413.21" width="59.06" height="29.53" rx="9" transform="translate(-661.27 -1221.38) rotate(45)" style="fill:#24181f" />
    <circle cx="641.56" cy="413.5" r="105.81" style="fill:#24181f" />
    <circle cx="640.4" cy="412.34" r="73" style="fill:#f0c339" />
    <circle cx="640.4" cy="412.34" r="43.47" style="fill:#e79e2d" />
    <rect x="2112.75" y="408.7" width="88.59" height="29.53" rx="9" transform="translate(2465.09 -814.64) rotate(135)" style="fill:#3e2f39" />
    <rect x="2127.51" y="408.7" width="59.06" height="29.53" rx="9" transform="translate(2465.09 -814.64) rotate(135)" style="fill:#24181f" />`,
    `<circle cx="367.46" cy="417.69" r="72.38" style="fill:#6e5074" />
    <circle cx="367.46" cy="417.69" r="66.81" style="fill:#f17f2b" />
    <circle cx="367.46" cy="417.69" r="38.97" style="fill:#172027" />
    <path d="M370.1,502.75A85.16,85.16,0,0,1,285,417.69h3.09a82.06,82.06,0,0,0,82,82Z"
      transform="translate(-2.64 0)" style="fill:#6e5074" />
    <circle cx="642.74" cy="419.24" r="72.38" style="fill:#6e5074" />
    <circle cx="642.74" cy="419.24" r="66.81" style="fill:#f17f2b" />
    <circle cx="642.74" cy="419.24" r="38.97" style="fill:#172027" />
    <path d="M645.38,504.3a85.16,85.16,0,0,0,85.06-85.06h-3.09a82.06,82.06,0,0,1-82,82Z"
      transform="translate(-2.64 0)" style="fill:#6e5074" />
    <path d="M568.88,382.62H820.72l-33.58-50.37H697.25a160.45,160.45,0,0,0-82.52,22.85Z"
      transform="translate(-2.64 0)" style="fill:#4a2955" />
    <path d="M438.21,381.59H186.36l33.58-50.37h89.9a160.45,160.45,0,0,1,82.52,22.85Z"
      transform="translate(-2.64 0)" style="fill:#4a2955" />`,
  ];

  const index = getRandomIntInclusive(0, eyesOptions.length - 1);
  console.log(`  Eyes: ${index}`);

  // TODO: generalize to `createSVG()` helper function
  const eyesSVG = `${svgOpenTag}${eyesOptions[index]}${svgCloseTag}`;

  return eyesSVG;
}
