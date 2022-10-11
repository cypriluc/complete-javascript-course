import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // pollyfilling

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

// Publisher-Subscriber pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
