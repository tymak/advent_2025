"use strict";
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "prod");

const fileContent = fs.readFileSync(filePath, "utf8");
const parsedInput = fileContent
  .trim()
  .split("\r\n")
  .map((i) => i.split(""))
  .map((i) => i.map((j) => parseInt(j)));

const getMaxAndIndex = (arr) => {
  let max = arr[0];
  let index = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
      index = i;
    }
  }
  return { value: max, index };
};

const getTupleForList = (arr) => {
  const max = getMaxAndIndex(arr.slice(0, -1));
  const second = getMaxAndIndex(arr.slice(max.index + 1));
  return { max: max.value, second: second.value };
};

const res = parsedInput
  .map((i) => getTupleForList(i))
  .map((j) => parseInt(String(j.max).concat(String(j.second))))
  .reduce((a, b) => a + b);

console.log("result: ", res);
