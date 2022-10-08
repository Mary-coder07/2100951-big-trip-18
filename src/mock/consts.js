import dayjs from 'dayjs';

const SUM_POINTS = 3;

const FilterType = {
  ALL: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const BlankNewPoint = {
  dateFrom: dayjs(),
  dateTo: dayjs(),
  type: 'taxi',
  basePrice: '',
  offers: [],
  destinations: '',
  isNewPoint: true,
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const NoDataMessage = 'Ooops! Something went wrong. Please try again later...';

const isEscPressed = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');

export {
  SUM_POINTS,
  FilterType,
  Mode,
  SortType,
  UserAction,
  UpdateType,
  BlankNewPoint,
  TimeLimit,
  Method,
  NoDataMessage,
  isEscPressed
};
