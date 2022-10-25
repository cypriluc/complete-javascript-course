import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _insertHTML(markup) {
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /////////////////// DOCUMENTATION ////////////////////
  // jsdoc.app - information how to write documentiation - for other people to understand what function is doing
  // FIRST LINE: function description
  // NEXT LINES: parameters - each parameter is described as:
  // @param {what type is expected - object OR array of objects} parameter name, parametr description
  // if parameter is optional, its name is in [], default value can be specified

  /**
   * Render the received object to the DOM
   * @param {*Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {*boolean} [render=true]  If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object } View instance
   * @author Lucia Cyprianova
   * @todo Finish implementation
   */

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._insertHTML(markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // convert string to real DOM node objects - virtual DOM living in the memory
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*')); // convert Nodelist to array
    const curElements = Array.from(this._parentElement.querySelectorAll('*')); // convert Nodelist to array

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Updates changed TEXT  // executed only on elements containing text directly
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
    this._insertHTML(markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div> 
    `;
    this._insertHTML(markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._insertHTML(markup);
  }
}
