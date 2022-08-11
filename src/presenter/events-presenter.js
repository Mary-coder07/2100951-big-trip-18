import { RenderPosition, render } from '../render.js';
import EventsListView from '../view/events-list-view.js';
import EventsItemView from '../view/events-item-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';

export default class EventsPresenter {
  eventsComponent = new EventsListView();

  renderEventsItem = (content, place = RenderPosition.BEFOREEND) => {
    const itemElement = new EventsItemView();
    render(itemElement, this.eventsComponent.getElement(), place);
    render(content, itemElement.getElement());
  };

  init = (eventsContainer) => {
    this.eventsContainer = eventsContainer;

    for (let i = 0; i < 3; i++) {
      this.renderEventsItem(new PointView());
    }

    render(this.eventsComponent, this.eventsContainer);
    this.renderEventsItem(new EditFormView(), RenderPosition.AFTERBEGIN);
  };
}
