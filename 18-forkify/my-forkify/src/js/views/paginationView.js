import View from './View.js';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateBtnMarkup(currentPage, 'next');
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateBtnMarkup(currentPage, 'previous');
    }

    // Other page
    if (currentPage < numPages) {
      return this._generateBtnMarkup(currentPage);
    }

    // Page 1, no other pages
    return '';
  }

  _generateBtnMarkup(currentPage, type = 'both') {
    const btnNext = `
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;

    const btnPrev = `
      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
    `;

    if (type === 'next') return btnNext;
    if (type === 'previous') return btnPrev;
    if (type === 'both') return btnNext + btnPrev;
  }
}

export default new paginationView();
