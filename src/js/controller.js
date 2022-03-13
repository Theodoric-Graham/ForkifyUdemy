import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; //polyfilling everything else
import 'regenerator-runtime/runtime'; //polyfilling async await

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    //1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

// same as the 2 below
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
