const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElementsFromArray = (arr) => {
  const maxLength = arr.length;
  const lengthOfArray = getRandomInteger(0, maxLength);
  const elements = [];

  for (let i = elements.length; i < lengthOfArray; i++) {
    const indexOfElement = getRandomInteger(0, maxLength - 1);
    const element = arr[indexOfElement];

    if (!elements.includes(element)) {
      elements.push(element);
    }
  }
  return elements;
};

export {
  getRandomInteger,
  getRandomElementsFromArray,
};
