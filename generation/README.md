# Bitcoin Faces Generator

A simple SVG generator that:

- contains a main script that accepts the number of SVGs to generate
- contains one component per layer (or attribute)
- each component contains possible options for the layer
  - a random index is generated between 0 and the length of options
  - using the random index, return the SVG code for that layer
  - if a layer is optional, add undefined to the array

Sample results below, generated images are stored in the generation/faces folder, which may need to be created first before running the script.

![bitcoin-faces-svg-sample-generation](https://user-images.githubusercontent.com/9038904/215890828-d6870da4-fd7a-42d9-9dce-504b2e6d55c9.png)

To run locally:

1. Fork and clone the repo
1. In the console, navigate to the `generation/` folder
1. Run `npm i` to install dependencies _(@types/node, ts-node, typescript)_
1. Run `npx ts-node generate-svgs.ts` to run the script
1. The number of SVGs generated is set in the generate-svgs.ts file at the bottom, e.g. `generateSVGs(5000);`
