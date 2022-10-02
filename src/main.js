import EventsPresenter from './presenter/events-presenter.js';
import PointsModel from './model/points-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';

const pageBodyElement = document.querySelector('.page-body__page-main');
const eventsElement = pageBodyElement.querySelector('.trip-events');
const siteFilterElement = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const eventsPresenter = new EventsPresenter(eventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);
const newEventBtn = document.querySelector('.trip-main__event-add-btn');

const handleNewEventFormClose = () => {
  newEventBtn.disabled = false;
};

const handleNewEventButtonClick = () => {
  eventsPresenter.createPoint(handleNewEventFormClose);
  newEventBtn.disabled = true;
};

newEventBtn.addEventListener('click', handleNewEventButtonClick);

eventsPresenter.init();
filterPresenter.init();
