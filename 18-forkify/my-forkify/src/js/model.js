import { async } from 'regenerator-runtime/runtime'; // polyffilling async functions
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data; // let recipe = data.data.recipe

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    // set bookmarked to either false or true
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    console.error(`${err} 🤯🤯🤯`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
    // reset page to one after new search
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} 🤯🤯🤯`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    // new quantity = old quantity * new servings / old servings
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // add bookmark
  state.bookmarks.push(recipe);

  // mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  // delete bookmark
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);

  // mark current recipe as not bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

// for development only
const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks

// upload recipes
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe) // convert an object into array of arrays {key1: value1, key2: value2} => [[key1, value1], [key2, value2]]
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '') // remove arrays that are not ingredients
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(','); // create an array in a form of [quantity, unit, description]

        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format :)'
          ); // test if array is valid - if not the function will immediately exit

        const [quantity, unit, description] = ingArr; // destructure ingredients array

        return { quantity: quantity ? +quantity : null, unit, description }; // convert quantity to number or null, otherwise ES6 syntax - if 'unit: unit ' use only 'unit'... ==> map each ingredient into this object
      });

    console.log(ingredients);
  } catch (err) {
    throw err;
  }

  const recipe = {};
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
