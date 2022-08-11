import { createElement } from '../render.js';

const createEventsItemTemplate = () => '<li class="trip-events__item"></li>';

export default class EventsItemView {
  getTemplate() {
    return createEventsItemTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
