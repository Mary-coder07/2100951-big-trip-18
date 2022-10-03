import { render, RenderPosition, remove } from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import SortView from '../view/sort-view.js';
import NoEventsView from '../view/no-events-view.js';
import NewPointPresenter from './new-point-presenter.js';
import PointPresenter from './point-presenter.js';
import { sortPointUp, sortPointsByPrice, sortPointsByDay } from '../utils/points.js';
import { filter } from '../utils/filter.js';
import { SortType, UpdateType, UserAction, FilterType } from '../mock/consts.js';
import TripInfoView from '../view/trip-info-view.js';
import { generateTripInfo } from '../mock/trip-info.js';
import LoadingView from '../view/loading-view.js';

export default class EventsPresenter {
  #contentContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #contentListComponent = new EventsListView();
  #loadingComponent = new LoadingView();
  #emptyComponent = null;
  #sortComponent = null;
  #tripInfoComponent = null;
  #filterComponent = null;

  #pointsPresenter = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;
  #isLoading = true;

  constructor(contentContainer, pointsModel, filterModel) {
    this.#contentContainer = contentContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#newPointPresenter = new NewPointPresenter(this.#contentListComponent, this.#handleViewAction);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortPointsByDay);
      case SortType.PTICE:
        return filteredPoints.sort(sortPointsByPrice);
      default:
        return filteredPoints.sort(sortPointUp);
    }
  }

  init = () => {
    this.#renderContent();
  };

  createPoint = (callback) => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
    this.#newPointPresenter.init(callback, this.#pointsModel.offers, this.#pointsModel.destinations);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#contentListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, this.#pointsModel.offers, this.#pointsModel.destinations);
    this.#pointsPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i]);
    }
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#contentContainer, RenderPosition.AFTERBEGIN);
  };

  #renderEmptyContentList = () => {
    this.#emptyComponent = new NoEventsView(this.#filterType);
    render(this.#emptyComponent, this.#contentContainer);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#contentContainer, RenderPosition.AFTERBEGIN);
  };

  #renderTripInfo = () => {
    const siteMainTripElement = document.querySelector('.trip-main');
    const tripInfo = generateTripInfo(this.#pointsModel);
    this.#tripInfoComponent = new TripInfoView(tripInfo);
    render(this.#tripInfoComponent, siteMainTripElement, RenderPosition.AFTERBEGIN);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearContent();
    this.#renderContent();
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsPresenter.get(data.id).init(data, this.#pointsModel.offers, this.#pointsModel.destinations);
        break;
      case UpdateType.MINOR:
        this.#clearContent();
        this.#renderContent();
        break;
      case UpdateType.MAJOR:
        this.#clearContent({ resetSortType: true });
        this.#renderContent();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderContent();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #clearContent = ({ resetSortType = false } = {}) => {

    this.#newPointPresenter.destroy();
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#tripInfoComponent);
    remove(this.#filterComponent);
    remove(this.#loadingComponent);

    if (this.#emptyComponent) {
      remove(this.#emptyComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderContent = () => {
    render(this.#contentListComponent, this.#contentContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const pointCount = this.points.length;

    if (pointCount === 0) {
      this.#renderEmptyContentList();
      return;
    }

    this.#renderSort();
    this.#renderTripInfo();
    this.#renderPoints();
  };

}
