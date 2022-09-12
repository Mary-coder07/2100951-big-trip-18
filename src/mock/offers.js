import { EXTRA_OFFERS, TYPES, offerPrice } from './consts.js';
import { getRandomInteger, getRandomElementsFromArray } from '../utils/common.js';

const mockOffers = [];
for (let i = 0; i < EXTRA_OFFERS.length; i++) {
  mockOffers.push({
    id: i,
    title: EXTRA_OFFERS[i],
    price: getRandomInteger(offerPrice.MIN, offerPrice.MAX),
  });
}

const mockOffersByType = [];
for (let i = 0; i < TYPES.length; i++) {
  mockOffersByType.push({
    type: TYPES[i],
    offers: getRandomElementsFromArray(mockOffers),
  });
}

export { mockOffers, mockOffersByType };
