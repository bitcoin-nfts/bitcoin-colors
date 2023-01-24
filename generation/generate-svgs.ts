import { writeFileSync } from "node:fs";
import * as generator from "./layers/common";

async function generateSVGs() {
  console.log("Setting up attributes...");
  console.log("-------------------------");
  const attributes = await Promise.all([
    generator.getBackground(1),
    generator.getBody(),
    generator.getHead(),
    generator.getFaceAccessory(-1),
    generator.getEarrings(),
    generator.getEars(),
    generator.getMouth(1),
    generator.getEyebrows(1),
    generator.getGlasses(-1),
    generator.getEyes(1),
    generator.getNose(),
    generator.getHat(-1),
  ]);
  console.log("Generating SVGs...");
  console.log("-------------------------");

  const svgOpenTag = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1025.56 1025.56">
  <title>Bitcoin Face</title>
  <g style="isolation:isolate">`;
  const svgCloseTag = `</g></svg>`;

  const bitcoinFace = {
    background: attributes[0],
    body: attributes[1],
    head: attributes[2],
    faceAccessory: attributes[3],
    earrings: attributes[4],
    ears: attributes[5],
    mouth: attributes[6],
    eyebrows: attributes[7],
    glasses: attributes[8],
    eyes: attributes[9],
    nose: attributes[10],
    hat: attributes[11],
  } satisfies generator.BitcoinFace;

  // TODO: use minifier?
  const bitcoinFaceSVG = `${svgOpenTag}${bitcoinFace.background}${bitcoinFace.body}${bitcoinFace.head}${bitcoinFace.faceAccessory}${bitcoinFace.earrings}${bitcoinFace.ears}${bitcoinFace.mouth}${bitcoinFace.eyebrows}${bitcoinFace.glasses}${bitcoinFace.eyes}${bitcoinFace.nose}${bitcoinFace.hat}${svgCloseTag}`;
  // console.log(bitcoinFaceSVG);

  console.log("Writing SVGs...");
  console.log("-------------------------");
  writeFileSync("bitcoin-face-alt.svg", bitcoinFaceSVG, "utf8");
}

generateSVGs();
