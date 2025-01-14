import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { humanizeDateDDMMYYHHmm, ucFirst } from '../utils/points.js';
import he from 'he';
import dayjs from 'dayjs';

const editPointTemplate = (point, offersByType, destinations, cities) => {
  const { dateFrom, dateTo, type, destination, basePrice, offers, isSaving, isDeleting, isDisabled, isNewPoint } = point;

  const types = offersByType ? offersByType.map((offerByType) => offerByType.type) : '';

  const isOfferChecked = (offer) => offers.includes(offer.id) ? 'checked' : '';

  const createEditOfferTemplate = () => {
    const offersBySelectedType = offersByType.find((offerByType) => offerByType.type === type).offers;

    return offersBySelectedType.map((offer) => `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" data-id="${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${isOfferChecked(offer)} ${isDisabled ? 'disabled' : ''}>
        <label class="event__offer-label" for="event-offer-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
     `).join(' ');
  };

  const offersTemplate = createEditOfferTemplate();

  const createPhotoTemplate = (destinationId) => {
    const currentDest = destinations.find((dest) => dest.id === destinationId);
    return currentDest ? currentDest.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('') : '';
  };

  const photoTemplate = createPhotoTemplate(destination);

  const createEditTypeTemplate = (currentType) =>
    types.map((iterationType) => `
      <div class="event__type-item">
        <input id="event-type-${iterationType}-${destination}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${iterationType}" ${currentType === iterationType ? 'checked' : ''} >
        <label class="event__type-label  event__type-label--${iterationType}" for="event-type-${iterationType}-${destination}">${ucFirst(iterationType)}</label>
      </div>
    `).join('');

  const typesTemplate = createEditTypeTemplate(type);

  const createDestinationListTemplate = (destinationId) => {
    const destName = destinations.find((dest) => dest.id === destinationId);

    return `
      <label class="event__label  event__type-output" for="event-destination-${destinationId}">${type}</label>
      <input class="event__input  event__input--destination" id="event-destination-${destinationId}" type="text" name="event-destination" value="${destName ? he.encode(destName.name) : ''}" list="destination-list-${destinationId}" onFocus="this.select()" required ${isDisabled ? 'disabled' : ''}>
      <datalist id="destination-list-${destinationId}">
        ${cities.map((city) => `
        <option value="${city}" ${destName && destName.name === city ? 'selected' : ''}></option>
        `).join('')}
      </datalist>`;
  };

  const destListTemplate = createDestinationListTemplate(destination);

  const getResetBtnTitle = () => {
    if (isNewPoint) {
      return 'Cancel';
    }
    return isDeleting ? 'Deleting...' : 'Delete';
  };

  return (`
    <li class="trip-events__item">
     <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${destination}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${destination}" type="checkbox" ${isDisabled ? 'disabled' : ''}>
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${typesTemplate}
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
        ${destListTemplate}
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${destination}">From</label>
          <input class="event__input  event__input--time" id="event-start-time-${destination}" type="text" name="event-start-time" value="${humanizeDateDDMMYYHHmm(dateFrom)}" ${isDisabled ? 'disabled' : ''}>
          —
          <label class="visually-hidden" for="event-end-time-${destination}">To</label>
          <input class="event__input  event__input--time" id="event-end-time-${destination}" type="text" name="event-end-time" value="${humanizeDateDDMMYYHHmm(dateTo)}" ${isDisabled ? 'disabled' : ''}>
        </div>
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${destination}">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-${destination}" type="number" name="event-price" value="${basePrice}" onkeydown="return event.keyCode !== 69 && event.keyCode !== 189" onFocus="this.select()" required ${isDisabled ? 'disabled' : ''}>
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
        <button class="event__reset-btn" type="reset">${getResetBtnTitle()}</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers ${!offersTemplate ? 'visually-hidden' : ''}" >
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
          ${offersTemplate}
          </div>
        </section>
        <section class="event__section  event__section--destination ${destination === '' ? 'visually-hidden' : ''}">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destinations[destination] !== undefined ? destinations[destination].description : ''}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${photoTemplate}
              </div>
          </div>
        </section>
      </section>
     </form>
    </li>
  `);
};

export default class PointEditView extends AbstractStatefulView {
  #datepickerFrom = null;
  #datepickerTo = null;
  #offersByType = null;
  #destinations = null;
  #cities = null;

  constructor(point, offersByType, destinations) {
    super();

    this.#offersByType = offersByType;
    this.#destinations = destinations;
    this._state = PointEditView.parsePointToState(point);
    this.#cities = this.#destinations.map((dest) => dest.name);

    this.#setInnerHandlers();
  }

  get template() {
    return editPointTemplate(this._state, this.#offersByType, this.#destinations, this.#cities);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  reset = (point) => {
    this.updateElement(
      PointEditView.parsePointToState(point),
    );
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };


  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.#setDatepickers();
  };

  #setInnerHandlers = () => {
    Array.from(this.element.querySelectorAll('.event__type-input'))
      .forEach((eventType) => eventType.addEventListener('click', this.#eventTypeToggleHandler));

    this.element.querySelector('.event__input--destination').addEventListener('change', this.#eventDestinationInputHandler);

    Array.from(this.element.querySelectorAll('.event__offer-checkbox'))
      .forEach((eventOffer) => eventOffer.addEventListener('change', this.#eventSelectOffersToggleHandler));

    this.element.querySelector('.event__input--price').addEventListener('change', this.#eventPriceChangeHandler);
    this.#setDatepickers();
  };

  #dateStartHandler = ([userDateStart]) => {
    this._setState({
      dateFrom: userDateStart,
    });
  };

  #dateEndHandler = ([userDateEnd]) => {
    this._setState({
      dateTo: userDateEnd,
    });
  };

  #setMinDateTo = () => {
    this.#datepickerTo.set('minDate', this.#datepickerFrom.selectedDates[0]);
    if (dayjs(this.#datepickerFrom.selectedDates[0]).isAfter(dayjs(this.#datepickerTo.selectedDates[0]))) {
      this.#datepickerTo.setDate(this.#datepickerFrom.selectedDates[0]);
    }
  };

  #setDatepickers = () => {
    const dateStartInput = this.element.querySelector('input[name="event-start-time"]');
    this.#datepickerFrom = flatpickr(
      dateStartInput,
      {
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateFrom.toISOString(),
        dateFormat: 'd/m/y H:i',
        onChange: [this.#dateStartHandler, this.#setMinDateTo],
      },
    );

    const dateEndInput = this.element.querySelector('input[name="event-end-time"]');
    this.#datepickerTo = flatpickr(
      dateEndInput,
      {
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateTo.toISOString(),
        dateFormat: 'd/m/y H:i',
        minDate: this._state.dateFrom.toISOString(),
        onChange: this.#dateEndHandler,
      },
    );
  };

  #eventTypeToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #eventDestinationInputHandler = (evt) => {
    evt.preventDefault();
    if (this.#cities.includes(evt.target.value)) {
      this.#destinations.forEach((dest) => {
        if (evt.target.value && dest.name === evt.target.value) {
          this.updateElement({
            destination: dest.id,
          });
        }
      });
    }
    else {
      evt.target.value = '';
    }
  };

  #eventSelectOffersToggleHandler = () => {
    const selectOffers = [];
    Array.from(this.element.querySelectorAll('.event__offer-checkbox'))
      .forEach((checkbox) => checkbox.checked ? selectOffers.push(Number(checkbox.dataset.id)) : '');
    this.updateElement({
      offers: selectOffers,
    });
  };

  #eventPriceChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.value > 0) {
      this._setState({
        basePrice: evt.target.value,
      });
    } else {
      evt.target.value = '';
    }

  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(PointEditView.parseStateToPoint(this._state));
  };

  static parsePointToState = (point) => ({
    ...point,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });

  static parseStateToPoint = (state) => {
    const point = { ...state };

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  };
}
