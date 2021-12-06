const fs = require("fs");

const data = fs
  .readFileSync("./src/data/day-6.txt")
  .toString()
  .trim()
  .split(",")
  .map((x) => parseInt(x));

const mapDataToJson = (data) => {
  let fishData = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  };
  data.forEach((fish) => {
    fishData[fish] += 1;
  });
  return fishData;
};

const advanceDay = (fish) => {
  let newFishData = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  };
  let fishkeys = Object.keys(fish);
  fishkeys.forEach((key) => {
    if (key === "0") {
      newFishData[6] += fish[0];
      newFishData[8] += fish[0];
    } else {
      newFishData[key - 1] += fish[key];
    }
  });
  return newFishData;
};

const advanceDays = (days, fish) => {
  let newFish = fish;
  for (i = 0; i < days; i++) {
    newFish = advanceDay(newFish);
  }
  return newFish;
};

const sumFish = (fish) => {
  let fishTotal = 0;
  let fishkeys = Object.keys(fish);
  fishkeys.forEach((key) => {
    fishTotal += fish[key];
  });
  return fishTotal;
};

const jsonData = mapDataToJson(data);
console.log(
  `Number of lanternfish after 80 days is: ${sumFish(
    advanceDays(80, jsonData)
  )}`
);
console.log(
  `Number of lanternfish after 256 days is: ${sumFish(
    advanceDays(256, jsonData)
  )}`
);
