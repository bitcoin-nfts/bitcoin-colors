import { getRandomIntInclusive } from "./common";

export async function getBackground() {
  const backgroundFillColors = [
    "#545392",
    "#fac2c1",
    "#ff0000",
    "#00ff00",
    "#0000ff",
  ];

  const index = getRandomIntInclusive(0, backgroundFillColors.length - 1);
  console.log(`  Background: ${index}`);

  const backgroundSVG = `<rect id="Background" width="1025.56" height="1025.56" style="${backgroundFillColors[index]}" />`;

  return backgroundSVG;
}
