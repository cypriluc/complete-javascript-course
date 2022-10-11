'strict mode';

const budget = Object.freeze([
  // Object.freeze() - freezes only first level, it is not 'deep'
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  // immutable object - none of the values can be changed
  jonas: 1500,
  matilda: 100,
});

// const getLimit = user => spendingLimits?.[user] ?? 0; // makes sense if spendingLimits might not be defined and 0 is different from falsy value
const getLimit = (user, limits) => limits[user] || 0;

// Pure function - does not have any side effects
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  // use default params where possible
  const cleanUser = user.toLowerCase();
  // avoid nested code, if-else blocks

  return value <= getLimit(cleanUser, limits)
    ? [...state, { value: -value, description, user: cleanUser }] // create a copy of the array,  if property name value are the same, no need to be repeated
    : state;
};

// const checkExpenses1 = function (state, limits) {
//   return state.map(entry => {
//     return entry.value <= -getLimit(entry.user, limits)
//       ? { ...entry, flag: 'limit' }
//       : entry;
//   });
//   /*   for (const entry of budget) {
//     if (entry.value <= -getLimit(limits, entry.user)) entry.flag = 'limit';
//   } */
// };

const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value <= -getLimit(entry.user, limits)
      ? { ...entry, flag: 'limit' }
      : entry
  );

// const logBigExpenses = function (bigLimit) {
//   let output = '';
//   for (const entry of budget)
//     output +=
//       entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
//   output = output.slice(0, -2); // Remove last '/ '
//   console.log(output);
// };

const getBigExpenses = (state, bigLimit) =>
  state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
// .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, '')
// .substring(3);

const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log('Final budget:');
console.log(finalBudget);

// logBigExpenses(500);
console.log('Final budget big expenses:');
console.log(getBigExpenses(finalBudget, 500));

// in real world use 'composing'
console.log('----------COMPOSITION TEST---------------');
// works for same restArgs for all function in composition
const compose =
  (...fns) =>
  (state, restArgs) => {
    return fns.reduceRight((acc, fn) => fn(acc, ...restArgs), state);
  };

const add3Exp = compose(addExpense, addExpense, addExpense); // adds 3x the same entry
const newBudgetComp = add3Exp(budget, [spendingLimits, 10, 'Pizza 🍕']);
console.log(newBudgetComp);

// for different parameters
console.log('----------COMPOSITION TEST 2---------------');
const addExpense2 =
  (value, description, user = 'jonas') =>
  (state, limits) => {
    const cleanUser = user.toLowerCase();
    return value <= getLimit(cleanUser, limits)
      ? [...state, { value: -value, description, user: cleanUser }]
      : state;
  };

const compose2 =
  (...fns) =>
  (state, limits) => {
    return fns.reduceRight((acc, fn) => fn(acc, limits), state);
  };

const testComposition = compose2(
  addExpense2(10, 'Pizza 🍕'),
  addExpense2(100, 'Going to movies 🍿', 'Matilda'),
  addExpense2(200, 'Stuff', 'Jonas'),
  checkExpenses
);

console.log(testComposition(budget, spendingLimits)); // items added in oposite orger??
