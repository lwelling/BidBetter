
export const meanValue = (numbersArray) => (numbersArray.reduce((acc, num) => acc + num) / numbersArray.length);

export const squareDiffs = (values) => values.map(value => {
  const diff = value - meanValue(values);
  return diff * diff;
});

export const standardDeviation = (data) => Math.sqrt(meanValue(squareDiffs(data)));
