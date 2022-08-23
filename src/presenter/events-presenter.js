import { RenderPosition, render } from '../render.js';
import EventsListView from '../view/events-list-view.js';
import EventsItemView from '../view/events-item-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';
import { mockOffersByType } from '../mock/offers.js';

export default class EventsPresenter {
  eventsComponent = new EventsListView();

  renderEventsItem = (content, place = RenderPosition.BEFOREEND) => {
    const itemElement = new EventsItemView();
    render(itemElement, this.eventsComponent.getElement(), place);
    render(content, itemElement.getElement());
  };

  init = (eventsContainer, pointsModel) => {
    this.eventsContainer = eventsContainer;
    this.pointsModel = pointsModel;
    this.mainPoints = [...this.pointsModel.getPoints()];

    this.mainPoints.forEach((point) => {
      this.renderEventsItem(new PointView(point));
    });

    render(this.eventsComponent, this.eventsContainer);
    this.renderEventsItem(new EditFormView(this.mainPoints[0], mockOffersByType), RenderPosition.AFTERBEGIN);
  };
}
