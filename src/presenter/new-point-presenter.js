import { render, remove, RenderPosition } from '../framework/render.js';
import PointEditView from '../view/point-edit-view.js';
import { UserAction, UpdateType, BlankNewPoint } from '../mock/consts.js';

export default class BlankNewPointPresenter {
  #contentList = null;
  #changeData = null;
  #pointEditComponent = null;
  #destroyCallback = null;
  #offers = null;
  #destinations = null;

  constructor(contentList, changeData) {
    this.#contentList = contentList;
    this.#changeData = changeData;
  }

  init = (callback, offers, destinations) => {
    this.#destroyCallback = callback;
    this.#offers = offers;
    this.#destinations = destinations;

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new PointEditView(BlankNewPoint, this.#offers, this.#destinations);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleEditClickFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleEditCloseClick);
    this.#pointEditComponent.setEditClickHandler(this.#handleEditCloseClick);

    render(this.#pointEditComponent, this.#contentList.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();
    
    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  setSaving = () => {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.target.classList.contains('event__input--time')){
      evt.target.blur();
    }
    if (!evt.target.classList.contains('event__input--time') && (isEscPressed(evt))) {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleEditClickFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleEditCloseClick = () => {
    this.destroy();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };
}
