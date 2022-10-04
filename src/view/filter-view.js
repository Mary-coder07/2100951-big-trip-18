import AbstractView from '../framework/view/abstract-view';

const createFilterItemTemplate = ({type, checked, disabled}) =>

  `<div class="trip-filters__filter">
     <input
      id="filter-${type}"
      class="trip-filters__filter-input visually-hidden"
      type="radio"
      name="trip-filter"
      value="${type}"
      ${checked ? 'checked' : ''}
      ${disabled ? 'disabled' : ''}/>
     <label
       class="trip-filters__filter-label"
       for="filter-${type}">${type}
     </label>
  </div>`;


const createFiltersTemplate = (filters) => {

  const filterItemsTemplate = filters.map((filter) => createFilterItemTemplate(filter));

  return `<form class="trip-filters" action="#" method="get">
           ${filterItemsTemplate.join('')}
           <button class="visually-hidden" type="submit">Accept filter</button>
         </form>`;
};

export default class ListFilterView extends AbstractView {
  #filters = [];

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }

  setFilterTypeChangeHandler(cb) {
    this._callback.filterTypeChange = cb;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}
