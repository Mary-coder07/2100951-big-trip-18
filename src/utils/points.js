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

const getDurationEventInMin = (dateFrom, dateTo) => dayjs(dateTo).diff(dayjs(dateFrom), 'minute');

const sortByPrice = (a, b) => b.basePrice - a.basePrice;

const sortByTime = (a, b) => getDurationEventInMin(b.dateFrom, b.dateTo) - getDurationEventInMin(a.dateFrom, a.dateTo);

const sortByDay = (a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom));

export {
  humanizeDateHHmm,
  humanizeDateMMMDD,
  humanizeDateDDMMYYHHmm,
  humanizeDateDDHHmm,
  ucFirst,
  getWeightForNullDate,
  sortByPrice,
  sortByTime,
  sortByDay,
};
