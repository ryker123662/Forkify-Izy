import View from "./View";
import icons from "../../img/icons.svg";

class PaginationView extends View {
    _parentElement = document.querySelector(".pagination");

    _generateMarkup() {
        const currPage = this._data.page;
        const numPages = Math.ceil(
            this._data.results.length / this._data.resultsPerPage
        );
        console.log(numPages);

        //* Page 1, and there are other pages
        if (currPage === 1 && numPages > 1) {
            return `
            <button class="btn--inline pagination__btn--next">
              <span>Page ${currPage + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button>
          `;
        }
        //* Last page
        if (currPage === numPages && numPages > 1) {
            return `
            <button class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${currPage - 1}</span>
            </button>  
          `;
        }
        //* Other page
        if (currPage < numPages) {
            return "other page";
        }
        //* Page 1, and there is no are page
        return "only 1 page";
    }
}

export default new PaginationView();
