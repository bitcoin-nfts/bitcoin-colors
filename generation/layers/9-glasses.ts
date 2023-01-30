import { getRandomIntInclusive } from "./common";

export async function getGlasses() {
  const svgOpenTag = `<g id="Glasses">`;
  const svgCloseTag = `</g>`;

  const glassesOptions = [
    `<line x1="389.25" y1="459.75" x2="597.02" y2="459.75" style="fill:none;stroke:#f26227;stroke-miterlimit:10;stroke-width:12px" />
  <circle cx="359.39" cy="505" r="68.33" style="fill:#f26227" />
  <circle cx="359.39" cy="505" r="59.8" style="fill:#d74b27" />
  <circle cx="644.12" cy="506.85" r="68.33" style="fill:#f26227" />
  <circle cx="644.11" cy="506.85" r="59.8" style="fill:#d74b27" />
  <rect x="1853.51" y="462.56" width="39.13" height="106.63" transform="translate(1316.12 2192.84) rotate(-135)" style="fill:#faa625" />
  <rect x="2144.46" y="467.23" width="39.13" height="106.63" transform="translate(1809.5 2406.53) rotate(-135)" style="fill:#faa625" />`,
    `<path
  d="M797.87,460.37A123.76,123.76,0,0,1,672.46,584.13c-68-.88-122.13-57.58-122.13-125.6h0a39.41,39.41,0,0,0-39.41-39.41h-1.85"
  transform="translate(-2.64 0)"
  style="fill:none;stroke:#070707;stroke-miterlimit:10;stroke-width:9px" />
<path
  d="M220.27,460.37A123.77,123.77,0,0,0,345.69,584.13c68-.88,122.12-57.58,122.12-125.6h0a39.41,39.41,0,0,1,39.42-39.41h1.84"
  transform="translate(-2.64 0)"
  style="fill:none;stroke:#070707;stroke-miterlimit:10;stroke-width:9px" />
<path
  d="M217.63,460.37H465.17a0,0,0,0,1,0,0v0A123.77,123.77,0,0,1,341.4,584.14h0A123.77,123.77,0,0,1,217.63,460.37v0A0,0,0,0,1,217.63,460.37Z"
  style="fill:#8f98c5;opacity:0.5700000000000001;mix-blend-mode:color-dodge" />
<path
  d="M546.54,459.23H794.08a0,0,0,0,1,0,0v0A123.77,123.77,0,0,1,670.31,583h0A123.77,123.77,0,0,1,546.54,459.23v0A0,0,0,0,1,546.54,459.23Z"
  style="fill:#8f98c5;opacity:0.5700000000000001;mix-blend-mode:color-dodge" />`,
    undefined,
  ];

  const index = getRandomIntInclusive(0, glassesOptions.length - 1);
  console.log(`  Glasses: ${index}`);

  // TODO: generalize to `createSVG()` helper function
  const glassesSVG = `${svgOpenTag}${glassesOptions[index]}${svgCloseTag}`;

  return glassesSVG;
}
