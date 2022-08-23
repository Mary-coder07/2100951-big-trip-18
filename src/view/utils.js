import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

function getRandomElementsFromArray(arr) {
  const maxLength = arr.length;
  const lengthOfArray = getRandomInteger(1, maxLength);
  const elements = [];
  for (let i = elements.length; i < lengthOfArray; i++) {
    const indexOfElement = getRandomInteger(0, maxLength - 1);
    const element = arr[indexOfElement];
    if (!elements.includes(element)) {
      elements.push(element);
    }
  }
  return elements;
}
function ucFirst(str) {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
}

const humanizeDateDDMMYYHHmm = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const humanizeDateHHmm = (date) => dayjs(date).format('HH:mm');
const humanizeDateMMMDD = (date) => dayjs(date).format('MMM DD');

export {
  getRandomInteger,
  humanizeDateHHmm,
  humanizeDateMMMDD,
  humanizeDateDDMMYYHHmm,
  getRandomElementsFromArray,
  ucFirst
};