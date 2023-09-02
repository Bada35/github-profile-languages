const PERCENT_TEXT = document.querySelectorAll("text")[1];

let percents = {};
let longestPercent = { percent: "", width: 0 };

for (let integer = 0; integer <= 100; integer++) {
  for (let decimal = 0; decimal < 10; decimal++) {
    const PERCENT = `${integer}.${decimal}%`;
    PERCENT_TEXT.innerHTML = PERCENT;
    const WIDTH = Math.round(PERCENT_TEXT.getBBox().width);
    percents[PERCENT] = WIDTH;

    if (WIDTH > longestPercent.width) {
      longestPercent = { percent: PERCENT, width: WIDTH };
    }

    if (integer === 100) {
      break;
    }
  }
}

document.body.innerText = `
  const PERCENTS = ${JSON.stringify(percents)};

  export { PERCENTS }
`;

alert(`const LONGEST_PERCENT = ${JSON.stringify(longestPercent)};`);
