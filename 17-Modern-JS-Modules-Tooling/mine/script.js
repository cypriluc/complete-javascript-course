import { cart, totalPrice } from './shoppingCart.js';

// IMPORTING MODULES
/* console.log('Importing module'); */

/* 
import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
addToCart('tomato', 6);
console.log(price, tq); 
*/

/* 
import * as ShoppingCart from './shoppingCart.js';
ShoppingCart.addToCart('potato', 12);
console.log(ShoppingCart.totalPrice, ShoppingCart.tq); 
*/

/* 
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 1);
add('apples', 8);
console.log(cart); 
*/

// TOP LEVEL AWAIT - only works in module
/* console.log('start fetching');
const res = await fetch('https://jsonplaceholder.typicode.com/posts'); // block entire modlule execution
const data = await res.json();
console.log(data);
console.log('go on'); */

/* 
const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts'); // block entire modlule execution
  const data = await res.json();
  return {
    title: data.at(-1).title,
    text: data.at(-1).body,
  };
}; */

// 1. option: not very clean
/* const lastPost = getLastPost();
lastPost.then(last => console.log(last)); */

// 2. option: top level await
/* const lastPost2 = await getLastPost();
console.log(lastPost2); */

// MODULE PATTERN
/* const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuality = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
    console.log(`shipping cost is ${shippingCost}`);
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuality,
  };
})(); */ // function use - not reusing code, only to create new scope

/* ShoppingCart2.addToCart('apple', 2);
ShoppingCart2.addToCart('banana', 3);
console.log(ShoppingCart2); */

// Intro to NPM
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 4 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state); // not working for nested objects

console.log(stateClone);

const stateDeepClone = cloneDeep(state);
console.log(stateDeepClone);

state.user.loggedIn = false;

// parcel - hot module replacement - rebuild when module is changed without reload
if (module.hot) {
  module.hot.accept();
}

class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');

console.log(
  state.cart.find(el => {
    el.quantity >= 2;
  })
);

Promise.resolve('TEST').then(x => console.log(x));

////////// POLYFILLING ////////////
// import 'core-js/stable';
import 'core-js/stable/array/find';
import 'core-js/stable/promise';

/////// POLYFILLING ASYNC FUNCTIONS /////////////
import 'regenerator-runtime/runtime';
