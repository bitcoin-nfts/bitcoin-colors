import { getRandomIntInclusive } from "./common";

export async function getBackground() {
  // taken from 12 sample faces, 9 total
  const backgroundFillColors = [
    "#3a6a7e",
    "#3d4b8a",
    "#a9d4eb",
    "#efe2db",
    "#f8f3c1",
    "#f9c1c0",
    "#fc532d",
    "#fdc4ff",
    "#fec233",
  ];

  const index = getRandomIntInclusive(0, backgroundFillColors.length - 1);
  console.log(`  Background: ${index}`);

  const backgroundSVG = `<rect id="Background" width="1025.56" height="1025.56" style="fill:${backgroundFillColors[index]}" />`;

  return backgroundSVG;
}
