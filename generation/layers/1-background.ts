export async function getBackground(index = 0) {
  const backgroundFillColors = ["#545392", "#fac2c1"];

  const backgroundSVG = `<rect id="Background" width="1025.56" height="1025.56" style="${backgroundFillColors[index]}" />`;

  return backgroundSVG;
}
