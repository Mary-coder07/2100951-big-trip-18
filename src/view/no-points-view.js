import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../mock/consts.js';

const NoPointsTextType = {
  [FilterType.ALL]: 'Click "NEW EVENT" in menu to create your first waypoint',
  [FilterType.FUTURE]: 'There are no future waypoints now',
  [FilterType.PAST]: 'There are no past waypoints now',
};

const createNoPointTemplate = (filterType) => {
  const createNoPointsText = NoPointsTextType[filterType];
  return `<p class="trip-events__msg">${createNoPointsText}</p>`;
};

export default class NoPointsView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}
