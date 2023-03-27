import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
    alert(error);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);

// window.addEventListener('hashchange', controlRecipes); SAME AS ABOVE
// window.addEventListener('load', controlRecipes);
