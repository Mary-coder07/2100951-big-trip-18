import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const humanizeDateDDMMYYHHmm = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const humanizeDateHHmm = (date) => dayjs(date).format('HH:mm');
const humanizeDateMMMDD = (date) => dayjs(date).format('MMM DD');

const humanizeDateDDHHmm = (dateFrom, dateTo) => {
  const minutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');
  if (minutes < 60) {
    return dayjs.duration(minutes, 'minutes').format('mm[m]');
  }
  if (minutes >= 60 && minutes < 1440) {
    return dayjs.duration(minutes, 'minutes').format('HH[h] mm[m]');
  }
  return dayjs.duration(minutes, 'minutes').format('DD[d] HH[h] mm[m]');
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

const sortPointsByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
const sortPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export {
  humanizeDateHHmm,
  humanizeDateMMMDD,
  humanizeDateDDMMYYHHmm,
  humanizeDateDDHHmm,
  ucFirst,
  getWeightForNullDate,
  sortPointUp,
  sortPointsByDay,
  sortPointsByPrice,
};
