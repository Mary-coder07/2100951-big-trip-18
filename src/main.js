import { render } from './framework/render.js';
import FilterView from './view/filter-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import PointsModel from './model/points-model.js';
import { generateFilter } from './mock/filter.js';

const pageHeaderElement = document.querySelector('.page-header');
const filtersElement = pageHeaderElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

const eventsPresenter = new EventsPresenter();
const pointsModel = new PointsModel();
const filters = generateFilter(pointsModel.tasks);

render(new FilterView(filters), filtersElement);

eventsPresenter.init(tripEventsElement, pointsModel);
