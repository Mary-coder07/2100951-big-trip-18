import { render, replace, remove, RenderPosition } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { filter } from '../utils/filter.js';
import { FilterType, UpdateType } from '../mock/consts.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, pointsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.init);
    this.#filterModel.addObserver(this.init);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return [
      {
        type: FilterType.ALL,
        name: 'everything',
        count: filter[FilterType.ALL](points).length,
      },
      {
        type: FilterType.FUTURE,
        name: 'future',
        count: filter[FilterType.FUTURE](points).length,
      },
      {
        type: FilterType.PAST,
        name: 'past',
        count: filter[FilterType.PAST](points).length,
      },
    ];
  }
  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new FilterView(filters);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);
    if (!prevFilterComponent) {
      render(this.#filterComponent, this.#filterContainer, RenderPosition.BEFOREEND);
      return;
    }
    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
