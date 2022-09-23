import { generatePoint } from '../mock/point.js';
import { SUM_POINTS } from '../mock/consts.js';
import { destinations } from '../mock/destination.js';
import { mockOffersByType } from '../mock/offers.js';

export default class PointsModel {
  #points = Array.from({ length: SUM_POINTS }, generatePoint);
  #offers = mockOffersByType;
  #destination = destinations;

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destination() {
    return this.#destination
  }
}
