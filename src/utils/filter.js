import { FilterType } from '../mock/consts.js';
import dayjs from 'dayjs';

const filter = {
  [FilterType.ALL]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs().isBefore(point.dateFrom) || dayjs().isBefore(point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs().isAfter(point.dateFrom)),
};

export { filter };
