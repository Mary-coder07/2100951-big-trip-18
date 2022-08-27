import { generatePoint } from '../mock/point.js';
import { SUM_POINTS } from '../mock/consts.js';

export default class PointsModel {
  #points = Array.from({ length: SUM_POINTS }, generatePoint);

  get tasks() {
  return this.#points;
  }
}
