import dayjs from 'dayjs';

const humanizeDateDDMMYYHHmm = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const humanizeDateHHmm = (date) => dayjs(date).format('HH:mm');
const humanizeDateMMMDD = (date) => dayjs(date).format('MMM DD');
const num = 60;

const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins / num);
  const minutes = mins % num;
  return `${hours}H ${minutes}M`;
};

const ucFirst = (str) => {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
}

export {
  humanizeDateHHmm,
  humanizeDateMMMDD,
  humanizeDateDDMMYYHHmm,
  getTimeFromMins,
  ucFirst
};
