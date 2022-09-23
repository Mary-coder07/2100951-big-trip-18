import { render, RenderPosition } from './framework/render.js';
import FilterView from './view/filter-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import PointsModel from './model/points-model.js';
import { generateFilter } from './mock/filter.js';

const pageHeaderElement = document.querySelector('.page-header');
const filtersElement = pageHeaderElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const yellowButton = document.querySelector('.trip-main__event-add-btn');

const pointsModel = new PointsModel();
const eventsPresenter = new EventsPresenter(tripEventsElement, pointsModel);

if (pointsModel.points.length) {
  const filters = generateFilter(pointsModel.points);

  render(new FilterView(filters), filtersElement, RenderPosition.BEFOREBEGIN);
}

eventsPresenter.init();
export { yellowButton };
