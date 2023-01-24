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
  ];

  const index = getRandomIntInclusive(0, eyesOptions.length - 1);
  console.log(`  Eyes: ${index}`);

  // TODO: generalize to `createSVG()` helper function
  const eyesSVG = `${svgOpenTag}${eyesOptions[index]}${svgCloseTag}`;

  return eyesSVG;
}
