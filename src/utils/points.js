import dayjs from 'dayjs';

const humanizeDateDDMMYYHHmm = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const humanizeDateHHmm = (date) => dayjs(date).format('HH:mm');
const humanizeDateMMMDD = (date) => dayjs(date).format('MMM DD');
const num = 60;

const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins / num);  
  const days = Math.trunc(hours / 24);
  const minutes = mins % num;
  return `${days}D ${hours}H ${minutes}M`;
};

const ucFirst = (str) => {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortPointUp = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

const sortPointTime = (pointA, pointB) => (pointB.dateTo - pointB.dateFrom) - (pointA.dateTo - pointA.dateFrom);

const sortPointPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export {
  humanizeDateHHmm,
  humanizeDateMMMDD,
  humanizeDateDDMMYYHHmm,
  getTimeFromMins,
  ucFirst,
  sortPointUp,
  sortPointPrice,
  sortPointTime,
};
