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

const getListOfValues = (arr) => {
  let lastIndex = 0;
  const list = [];
  for (let i = 0; i < 12; i++) {
    const a = arr.slice(lastIndex, -11 + i);
    const b = arr.slice(lastIndex, 0);
    const c = arr.slice(lastIndex);

    const max =
      i - 11 < 0
        ? getMaxAndIndex(arr.slice(lastIndex, -11 + i))
        : getMaxAndIndex(arr.slice(lastIndex));
    lastIndex += max.index + 1;
    list.push(max.value);
  }
  const x = list.map((i) => String(i)).reduce((a, b) => a.concat(b), "");
  return parseInt(x);
};

const res = parsedInput.map((i) => getListOfValues(i)).reduce((a, b) => a + b);

console.log("result: ", res);
