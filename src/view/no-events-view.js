import AbstractView from '../framework/view/abstract-view.js';

const createNoEventTemplate = () => (
  `<p class="board__no-tasks">
    Click «ADD NEW TASK» in menu to create your first task
  </p>`
);

export default class NoEventsView extends AbstractView {

  get template() {
    return createNoEventTemplate();
  }
}
