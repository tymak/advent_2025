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
 * @param string {string}
 * @returns {string[]}
 */
const getSequences = (string) => {
  const allowedLength = Math.floor(string.length / 2);
  return [
    string.slice(0, 1),
    string.slice(0, 2),
    string.slice(0, 3),
    string.slice(0, 4),
    string.slice(0, 5),
  ].filter((seq) => seq.length <= allowedLength);
};

/**
 *
 * @param number {number}
 * @returns {boolean}
 */
const isValidId = (number) => {
  const stringifiedNumber = String(number);
  const sequencesToTest = getSequences(stringifiedNumber);
  const isSequenceMatching = sequencesToTest.map((seq) => {
    let isSeqMatch = true;
    for (let i = 0; i < stringifiedNumber.length; i += seq.length) {
      if (stringifiedNumber.slice(i, i + seq.length) !== seq) {
        isSeqMatch = false;
        break;
      }
    }
    return isSeqMatch;
  });

  return isSequenceMatching.every((i) => !i);
};

/**
 *
 * @param range {Range}
 * @returns number
 */
const processRange = (range) => {
  let invalidIds = [];
  for (let i = range.start; i <= range.end; i++) {
    if (!isValidId(i)) {
      invalidIds.push(i);
    }
  }
  return invalidIds;
};

const result = parsedInput
  .map(processRange)
  .flat()
  .reduce((a, b) => a + b);

console.log("result: ", result);
