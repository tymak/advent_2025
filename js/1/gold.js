"use strict";
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "prod");

const fileContent = fs.readFileSync(filePath, "utf8");
const parsedInput = fileContent
  .trim()
  .split("\n")
  .map((line) => {
    let chars = line.split("");
    let direction = chars[0];
    let steps = parseInt(chars.slice(1).join(""));
    return {
      direction,
      steps,
    };
  });

let counter = 0;
let currentPosition = 50;

for (let i = 0; i < parsedInput.length; i++) {
  const instruction = parsedInput[i];
  if (instruction.direction === "L") {
    currentPosition -= instruction.steps;

    while (currentPosition < 0) {
      counter++;
      currentPosition += 100;
    }
  } else {
    currentPosition += instruction.steps;
    counter += Math.floor(currentPosition / 100);
    while (currentPosition >= 100) {
      currentPosition -= 100;
    }
  }
}
console.log("COUNTER", counter);
