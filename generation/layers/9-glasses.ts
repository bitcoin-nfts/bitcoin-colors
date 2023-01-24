export async function getGlasses(index = 0) {
  if (index === -1) return undefined;

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
  ];

  // TODO: generalize to `createSVG()` helper function
  const glassesSVG = `${svgOpenTag}${glassesOptions[index]}${svgCloseTag}`;

  return glassesSVG;
}
