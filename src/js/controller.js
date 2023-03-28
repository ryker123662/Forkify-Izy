import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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
        console.log(resultsView);

        //* 1) get search query
        const query = searchView.getQuery();
        if (!query) return;

        //* 2) Load search results
        await model.loadSearchResults(query);

        //* 3) Render results
        console.log(model.state.search.results);
    } catch (error) {
        console.log(error);
    }
};
controlSearchResults();

//?
const init = function () {
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlSearchResults);
};
init();
