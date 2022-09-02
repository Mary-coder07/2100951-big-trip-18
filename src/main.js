import { render } from './framework/render.js';;
import FilterView from './view/filter-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import PointsModel from './model/points-model.js';

const pageHeaderElement = document.querySelector('.page-header');
const filtersElement = pageHeaderElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

const eventsPresenter = new EventsPresenter();
const pointsModel = new PointsModel();

render(new FilterView(), filtersElement);

eventsPresenter.init(tripEventsElement, pointsModel);
