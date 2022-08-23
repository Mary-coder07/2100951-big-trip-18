import { getRandomInteger } from '../view/utils.js';
import { TYPES, EXTRA_OFFERS, basePrice, destinationId } from './consts.js';
import dayjs from 'dayjs';

const generateDate = () => {
  const dayGap = getRandomInteger(1, 31);
  const hourGap = getRandomInteger(1, 24);
  const minGap = getRandomInteger(1, 60);
  const dateFrom = dayjs().add(dayGap, 'day').add(hourGap, 'hour').add(minGap, 'minute');
  const dateTo = dateFrom.add(hourGap, 'hour').add(minGap, 'minute');

  return { dateFrom, dateTo };
};

export const generatePoint = () => {
  const datePoint = generateDate();
  return {
    basePrice: getRandomInteger(basePrice.MIN, basePrice.MAX),
    dateFrom: datePoint.dateFrom,
    dateTo: datePoint.dateTo,
    destination: getRandomInteger(destinationId.MIN, destinationId.MAX),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: [...new Set(Array.from({length: getRandomInteger(0, EXTRA_OFFERS.length - 1)}, ()=> getRandomInteger(0, EXTRA_OFFERS.length - 1)))],
    type: TYPES[getRandomInteger(0, TYPES.length - 1)],
  };
};
