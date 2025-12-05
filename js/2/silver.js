"use strict";
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "prod");

const fileContent = fs.readFileSync(filePath, "utf8");
const parsedInput = fileContent
  .trim()
  .replaceAll("\r\n", "")
  .split(",")
  .map((i) => {
    const [start, end] = i.split("-");
    return { start: parseInt(start), end: parseInt(end) };
  });

/**
 * @typedef {object} Range
 * @property {number} start
 * @property {number} end
 */

/**
 *
 * @param range {Range}
 * @returns number
 */
const processRange = (range) => {
  let invalidIds = [];
  for (let i = range.start; i <= range.end; i++) {
    const stringifiedNumber = String(i);
    const stringLength = stringifiedNumber.length;
    if (stringLength % 2 === 0) {
      const a = stringifiedNumber.slice(0, stringLength / 2);
      const b = stringifiedNumber.slice(stringLength / 2);
      if (a === b) {
        invalidIds.push(i);
      }
    }
  }
  return invalidIds;
};

const result = parsedInput
  .map(processRange)
  .flat()
  .reduce((a, b) => a + b, 0);

console.log("result: ", result);
