import { render, RenderPosition } from '../framework/render.js';
import NewPointView from '../view/new-point-view.js';
import EventsListView from '../view/events-list-view.js';
import SortView from '../view/sort-view.js';
import NoEventsView from '../view/no-events-view.js';
import { updateItem } from '../utils/common.js';
import PointPresenter from './point-presenter.js';
import { sortPointUp, sortPointPrice, sortPointTime } from '../utils/points.js';
import { SortType } from '../mock/consts.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointsModel = null;
  #mainPoints = null;

  #eventsComponent = new EventsListView();
  #newPointComponent = new NewPointView();
  #sortComponent = new SortView();
  #noTaskComponent = new NoEventsView();

  #pointsPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedMainPoints = [];

  constructor(eventsContainer, pointsModel) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#mainPoints = [...this.#pointsModel.points];

    this.#sourcedMainPoints = [...this.#pointsModel.points];
    this.#sortPoints();
    this.#renderPoints();
  };

  #renderPoint = (point) => {

    const pointPresenter = new PointPresenter(this.#eventsComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointsPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    if (this.#mainPoints.length) {
      this.#renderNewPoint();
      this.#renderContentList();

      this.#mainPoints.forEach((point) => {
        this.#renderPoint(point);
      });
    } else {
      this.#renderEmptyContentList();
    }
    this.#renderSort();
  };

  #renderEmptyContentList = () => {
    render(this.#noTaskComponent, this.#eventsContainer);
  };

  #renderContentList = () => {
    render(this.#eventsComponent, this.#eventsContainer);
  };

  #renderNewPoint = () => {
    render(this.#newPointComponent, this.#eventsComponent.element);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #clearPointList = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.TIME:
        this.#mainPoints.sort(sortPointTime);
        break;
      case SortType.PTICE:
        this.#mainPoints.sort(sortPointPrice);
        break;
      default:
        this.#mainPoints.sort(sortPointUp);
    }
    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPoints();
  };

  #handlePointChange = (updatedPoint) => {
    this.#mainPoints = updateItem(this.#mainPoints, updatedPoint);
    this.#sourcedMainPoints = updateItem(this.#sourcedMainPoints, updatedPoint);
    this.#pointsPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };
}
