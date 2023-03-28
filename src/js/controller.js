import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";

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
        const query = searchView.getQuery();
        if (!query) return;

        await model.loadSearchResults(query);
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
