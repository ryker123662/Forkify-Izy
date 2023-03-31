import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
//     module.hot.accept();
// }

//? Responsible for loading the recipe
const controlRecipes = async function () {
    try {
        //* id of the recipe
        const id = window.location.hash.slice(1);

        //* Render spinner
        if (!id) return;
        recipeView.renderSpinner();

        //? 0) Update results view to mark selected search results
        resultsView.update(model.getSearchResultsPage());

        //? 1) Updating the bookmarks view
        bookmarksView.update(model.state.bookmarks);

        //? 2) Loading the recipe || Getting access to the state
        await model.loadRecipe(id);

        //? 3) Rendering the recipe
        recipeView.render(model.state.recipe);
    } catch (error) {
        recipeView.renderError();
        console.error(error);
    }
};

const controlSearchResults = async function () {
    try {
        resultsView.renderSpinner();

        //* 1) get search query
        const query = searchView.getQuery();
        if (!query) return;

        //* 2) Load search results
        await model.loadSearchResults(query);

        //* 3) Render results
        // resultsView.render(model.state.search.results);

        resultsView.render(model.getSearchResultsPage());

        //* 4) Render the initial pagination buttons
        paginationView.render(model.state.search);
    } catch (error) {
        console.log(error);
    }
};

const controlPagination = function (goToPage) {
    //* 1) Render NEW results
    resultsView.render(model.getSearchResultsPage(goToPage));

    //* 2) Render NEW pagination buttons
    paginationView.render(model.state.search);
};

//* Event handler, executed when the user clicks the button (decrease of increase)
const controlServings = function (newServings) {
    //* Update the recipe servings (in the state)
    model.updateServings(newServings);

    //* Update the recipe view
    // recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);
};

//! Controller function to add bookmarks
const controlAddBookmark = function () {
    //? 1) Add/remove bookmarks
    if (!model.state.recipe.bookmarked) {
        model.addBookmark(model.state.recipe);
    } else {
        model.deleteBookmark(model.state.recipe.id);
    }

    //? 2) Update the recipe view
    recipeView.update(model.state.recipe);

    //? 3) Render the bookmarks
    bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
    bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
    try {
        //* Show loading spinner
        addRecipeView.renderSpinner();

        await model.uploadRecipe(newRecipe);
        console.log(model.state.recipe);

        //* Render recipe
        recipeView.render(model.state.recipe);

        //* Display success message
        addRecipeView.renderMessage();

        //* Close form window
        setTimeout(function () {
            // addRecipeView.toggleWindow();
        }, MODAL_CLOSE_SEC * 1000);
    } catch (error) {
        console.error("🛑🛑", error);
        addRecipeView.renderError(error.message);
    }
};

const init = function () {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
    addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
