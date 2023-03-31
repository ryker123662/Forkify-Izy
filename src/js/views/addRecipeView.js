import View from "./View";

class AddRecipeView extends View {
    _parentElement = document.querySelector(".upload");

    _window = document.querySelector(".add-recipe-window");
    _overlay = document.querySelector(".overlay");
    _btnOpen = document.querySelector(".nav__btn--add-recipe");
    _btnClose = document.querySelector(".btn--close-modal");

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow() {
        this._overlay.classList.toggle("hidden");
        this._window.classList.toggle("hidden");
    }

    //* Function to remove the hidden class from the dom and show the modal
    _addHandlerShowWindow() {
        this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
    }

    _addHandlerHideWindow() {
        this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
        this._overlay.addEventListener("click", this.toggleWindow.bind(this));
    }

    // Method for form submission
    addHandlerUpload(handler) {
        this._parentElement.addEventListener("submit", function (e) {
            // we spreading into an array
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);

            e.preventDefault();
        });
    }

    _generateMarkup() {}
}

export default new AddRecipeView();