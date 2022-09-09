import { render } from '../framework/render.js';
import NewPointView from '../view/new-point-view.js';
import EventsListView from '../view/events-list-view.js';
import SortView from '../view/sort-view.js';
import NoEventsView from '../view/no-events-view.js';
import { updateItem } from '../utils/common.js';
import PointPresenter from './point-presenter.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointsModel = null;
  #mainPoints = null;

  #eventsComponent = new EventsListView();
  #newPointComponent = new NewPointView();
  #sortComponent = new SortView();
  #noTaskComponent = new NoEventsView();

  #pointsPresenter = new Map();

  constructor(eventsContainer, pointsModel) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#mainPoints = [...this.#pointsModel.points];

    if (this.#mainPoints.length) {
      this.#renderNewPoint();
      this.#renderContentList();

      this.#mainPoints.forEach((point) => {
        this.#renderPoint(point);
      });
    } else {
      this.#renderEmptyContentList();
    }
    this.#renderSortList();
  };

  #renderPoint = (point) => {

    const pointPresenter = new PointPresenter(this.#eventsComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointsPresenter.set(point.id, pointPresenter);
  };

  #renderEmptyContentList = () => {
    render(this.#noTaskComponent, this.#eventsContainer);
  };

  #renderContentList = () => {
    render(this.#eventsComponent, this.#eventsContainer)
  };

  #renderNewPoint = () => {
    render(this.#newPointComponent, this.#eventsComponent.element);
  };

  #renderSortList = () => {
    render(this.#sortComponent, this.#eventsContainer);
  };

  #handlePointChange = (updatedPoint) => {
    this.#mainPoints = updateItem(this.#mainPoints, updatedPoint);
    this.#pointsPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };
}