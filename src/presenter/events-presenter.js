import { replace, render } from '../framework/render.js';;
import EventsListView from '../view/events-list-view.js';
import EventsItemView from '../view/events-item-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import NoEventsView from '../view/no-events-view.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointsModel = null;
  #mainPoints = null;
  #eventsComponent = new EventsListView();

  renderEventsItem = (content) => {
    const itemElement = new EventsItemView();
    render(itemElement, this.#eventsComponent.element);
    render(content, itemElement.element);
  };

  #renderPoint = (point) => {
    const pointComponent = new PointView(point);
    const pointEditComponent = new EditFormView(point);

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);      
      document.removeEventListener('keydown', onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setCancelEditClickHandler(() => {
      replaceFormToPoint();
    });

    pointEditComponent.setSubmitHandler(() => {
      replaceFormToPoint();
    });

    this.renderEventsItem(pointComponent);
  };

  init = (eventsContainer, pointsModel) => {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
    this.#mainPoints = [...this.#pointsModel.tasks];

    if (this.#mainPoints.length) {
      render(new SortView(), this.#eventsContainer);
      render(this.#eventsComponent, this.#eventsContainer);

      this.#mainPoints.forEach((point) => {
        this.#renderPoint(point);
      });
    } else {
      render(new NoEventsView(), this.#eventsContainer);
    }
  };
}
