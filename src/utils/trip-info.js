import dayjs from 'dayjs';

const getTripInfo = (points) => {
  const pointsSequence = points.slice(0);
  let tripCost = 0;
  pointsSequence.sort((a, b) => dayjs(a.dateFrom).isAfter(b.dateFrom) ? 1 : -1).forEach((point) => {
    point.offers.forEach((offer) => {
      tripCost += Number(offer.price);
    });
    tripCost += Math.abs(Number(point.basePrice));
  });
  return { pointsSequence, tripCost };
};

export { getTripInfo };
