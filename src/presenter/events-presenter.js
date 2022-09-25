import { render, RenderPosition, remove } from '../framework/render.js';
import NewPointView from '../view/new-point-view.js';
import EventsListView from '../view/events-list-view.js';
import SortView from '../view/sort-view.js';
import NoEventsView from '../view/no-events-view.js';
import { updateItem } from '../utils/common.js';
import PointPresenter from './point-presenter.js';
import { sortPointUp, sortPointsByPrice, sortPointsByDay } from '../utils/points.js';
import { SortType } from '../mock/consts.js';
import { yellowButton } from '../main.js';

const POINTS_COUNT = 10;

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;

  #tripPoints = [];
  #tripOffers = [];
  #tripDestinations = [];

  #currentSortType = null;

  #pointListComponent = new EventsListView();
  #noPointComponent = new NoEventsView();
  #sortComponent = new SortView();

  #pointAddComponent = null;

  #pointPresenter = new Map();
  #sourcedBoardPoints = [];

  constructor(tripEvents, pointsModel) {
    this.#tripContainer = tripEvents;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#tripPoints = [...this.#pointsModel.points];
    this.#tripOffers = this.#pointsModel.offers;
    this.#tripDestinations = this.#pointsModel.destinations;

    this.#sourcedBoardPoints = [...this.#pointsModel.points];

    this.#pointAddComponent = new NewPointView(this.#renderPointAdd, this.#handleDestroyPointAddClick);
    this.#pointAddComponent.setPointAddHandler(yellowButton);
    this.#pointAddComponent.setDestroyPointAddHandler();

    this.#renderTripEvents();
    this.#renderSort();
    this.#sortPoints();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);

    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#tripPoints.sort(sortPointsByDay);
        break;
      case SortType.PRICE:
        this.#tripPoints.sort(sortPointsByPrice);
        break;
      default:
        this.#tripPoints.sort(sortPointUp);
    }
    this.#currentSortType = sortType;
  };

  #handlerSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#removeSortList();
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handlerSortTypeChange);
  };

  #removeSortList = () => {
    remove(this.#pointListComponent);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point, this.#tripOffers, this.#tripDestinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (from, to) => {
    this.#tripPoints
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point));
  };

  #renderNoEventsView = () => {
    render(this.#noPointComponent, this.#tripContainer, RenderPosition.BEFOREEND);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) =>
      presenter.destroy());
    this.#pointPresenter.clear();

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }
  };

  #renderPointList = () => {
    render(this.#pointListComponent, this.#tripContainer);
    this.#renderPoints(0, Math.min(this.#tripPoints.length, POINTS_COUNT));
  };

  #renderTripEvents = () => {
    if (this.#tripPoints.length === 0) {
      this.#renderNoEventsView();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
  };

  #renderPointAdd = () => {
    render(this.#pointAddComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #removeNewPointView = () => {
    remove(this.#pointAddComponent);
  };

  #handleDestroyPointAddClick = () => {
    this.#removeNewPointView();
  };
}
