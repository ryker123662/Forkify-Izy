import View from "./View";
import icons from "../../img/icons.svg";

class PaginationView extends View {
    _parentElement = document.querySelector(".pagination");

    _generateMarkup() {
        const numPages = this._data.results / this._data.resultsPerPage;
        console.log(numPages);

        //* Page 1, and there are other pages
        //* Page 1, and there is no are page
        //* Last page
        //* Other page
    }
}

export default new PaginationView();
