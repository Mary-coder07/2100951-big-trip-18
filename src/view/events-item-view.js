import AbstractView from '../framework/view/abstract-view.js';

const createEventsItemTemplate = () => '<li class="trip-events__item"></li>';

export default class EventsItemView extends AbstractView{

  get template() {
    return createEventsItemTemplate();
  }
}
