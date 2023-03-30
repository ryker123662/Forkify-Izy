import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
//     module.hot.accept();
// }

const controlRecipes = async function () {
    try {
        //* id of the recipe
        const id = window.location.hash.slice(1);

        //* Render spinner
        if (!id) return;
        recipeView.renderSpinner();

        //? 1. Loading the recipe || Getting access to the state
        await model.loadRecipe(id);

        //? 2. Rendering the recipe
        recipeView.render(model.state.recipe);
    } catch (error) {
        recipeView.renderError();
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
    recipeView.render(model.state.recipe);
};

const init = function () {
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
};
init();
