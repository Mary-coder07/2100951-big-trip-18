import { RenderPosition, render } from '../render.js';
import EventsListView from '../view/events-list-view.js';
import EventsItemView from '../view/events-item-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointsModel = null;
  #mainPoints = null;
  #eventsComponent = new EventsListView();

  renderEventsItem = (content, place = RenderPosition.BEFOREEND) => {
    const itemElement = new EventsItemView();
    render(itemElement, this.#eventsComponent.element, place);
    render(content, itemElement.element);
  };


  #renderPoint = (point) => {
    const pointComponent = new PointView(point);
    const pointEditComponent = new EditFormView(point);

    const eventEditBtn = pointComponent.element.querySelector('.event__rollup-btn');
    const cancelEditBtn = pointEditComponent.element.querySelector('.event__reset-btn');

    const replacePointToForm = () => {
      pointComponent.element.parentNode.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      pointEditComponent.element.parentNode.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    eventEditBtn.addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    cancelEditBtn.addEventListener('click', () => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    this.renderEventsItem(pointComponent);
  };

  init = (eventsContainer, pointsModel) => {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
    this.#mainPoints = [...this.#pointsModel.tasks];

    this.#mainPoints.forEach((point) => {
      this.#renderPoint(point);
    });

    render(this.#eventsComponent, this.#eventsContainer);
  };
}
