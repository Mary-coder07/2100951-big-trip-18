import {createElement} from '../render.js';

const createNoEventTemplate = () => (
  `<p class="board__no-tasks">
    Click «ADD NEW TASK» in menu to create your first task
  </p>`
);

export default class NoEventView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNoEventTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}