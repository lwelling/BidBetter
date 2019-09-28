
export const meanValue = (numbersArray) => (numbersArray.reduce((acc, num) => acc + num) / numbersArray.length);

export const squareDiffs = (valuesArray) => valuesArray.map(value => {
  const diff = value - meanValue(valuesArray);
  return diff * diff;
});

export const standardDeviation = (dataArray) => Math.sqrt(meanValue(squareDiffs(dataArray)));
