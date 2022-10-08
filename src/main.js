import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic dmFsZW50aW5fMDA3OTRAYmsucnU6UEBzc3cwcmQzMg=';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const pageBodyElement = document.querySelector('.page-body__page-main');
const eventsElement = pageBodyElement.querySelector('.trip-events');
const siteFilterElement = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const eventsPresenter = new TripPresenter(eventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);
const newEventBtn = document.querySelector('.trip-main__event-add-btn');

const handleNewEventFormClose = () => {
  newEventBtn.disabled = false;
};

const handleNewEventButtonClick = () => {
  eventsPresenter.createPoint(handleNewEventFormClose);
  newEventBtn.disabled = true;
};

eventsPresenter.init();
filterPresenter.init();

newEventBtn.disabled = true;

pointsModel.init()
  .finally(() => {
    newEventBtn.addEventListener('click', handleNewEventButtonClick);
  });
