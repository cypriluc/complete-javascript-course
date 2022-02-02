'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  orderDelivery: function ({starterIndex = 1, mainIndex = 0, time = '20:00', address}) {
    // console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
  },

  orderPasta: function(ing1, ing2, ing3) {
    // console.log(`Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`);
  }
};

restaurant.orderDelivery({
  time: '22:30',
  address: 'Dlouhá 3',
  mainIndex: 2,
  starterIndex: 2
})

const {name, openingHours, categories} = restaurant;
// console.log(name, openingHours, categories);

const {name: restaurantName, openingHours: hours, categories: tags} = restaurant;
// console.log(restaurantName, hours, tags);

// Default values
const { menu = [], starterMenu: starters = []} = restaurant;
//console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = {a: 23, b: 7, c: 14};
({a, b} = obj);
// console.log(a, b);

// Nested object
const {fri: {open: o, close: c}} = openingHours;
// console.log(o, c);

// Spread operator
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// Copy array - create shallow copy
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
const wholeMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
//console.log(wholeMenu);

// Iterables: arrays, strings, maps, sets. NOT objects
const str = 'Lucia';
// console.log(...str);
const letters = [...str, ' ', 'S.'];
// console.log(letters);

/* const ingredients = [
  prompt('Lets\'s make pasta! Ingredient 1?'), 
  prompt('Ingredient 2?'),
  prompt('Ingredient 3?')
]
restaurant.orderPasta(...ingredients); */

// Real world scenario
// Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe'}

// console.log(newRestaurant);

const restaurantCopy = {...restaurant};
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);


