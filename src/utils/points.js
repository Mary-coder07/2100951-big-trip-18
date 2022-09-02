import dayjs from 'dayjs';

const humanizeDateDDMMYYHHmm = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const humanizeDateHHmm = (date) => dayjs(date).format('HH:mm');
const humanizeDateMMMDD = (date) => dayjs(date).format('MMM DD');

const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}H ${minutes}M`;
};

function ucFirst(str) {
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