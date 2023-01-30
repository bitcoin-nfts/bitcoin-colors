import { writeFileSync } from "node:fs";
import * as generator from "./layers/common";

async function generateSVGs(total: number) {
  const svgOpenTag = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
  <title>Bitcoin Face</title>
  <g style="isolation:isolate">`;
  const svgCloseTag = `</g></svg>`;

  // generate faces for testing
  for (let i = 0; i < total; i++) {
    console.log("-------------------------");
    console.log("Setting up attributes...");
    const attributes = await Promise.all([
      generator.getBackground(),
      generator.getBody(),
      generator.getHead(),
      generator.getFaceAccessory(),
      generator.getEarrings(),
      generator.getEars(),
      generator.getMouth(),
      generator.getEyebrows(),
      generator.getGlasses(),
      generator.getEyes(),
      generator.getNose(),
      generator.getHat(),
    ]);
    console.log("Generating SVG...");

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

    console.log("Writing SVG...");
    const path = `faces/bitcoin-face-${i + 1}.svg`;
    console.log(`path: ${path}`);
    writeFileSync(path, bitcoinFaceSVG, "utf8");
  }
}

generateSVGs(100);
