var dataset = require("./dataset.json");
const bankBalances = dataset.bankBalances;
/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/

const hundredThousandairs = bankBalances.filter(item => {
  return item.amount > 100000;
});

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
const intArr = bankBalances.map(item => {
  return parseInt(item.amount);
});
const sumOfBankBalances = intArr.reduce((prev, curr) => {
  return prev + curr;
});

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest dollar 
  and then sum it all up into one value saved to `sumOfInterests`
 */
const states = ["WI", "IL", "WY", "OH", "GA", "DE"];
let sumOfInterests = bankBalances
  .filter(i => {
    return states.includes(i.state);
  })
  .reduce((total, next) => {
    return total + Math.round(parseInt(next.amount) * 0.189);
  }, 0);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest dollar

  note: During your summation (
    if at any point during your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */

var stateSums = bankBalances.reduce((o, current) => {
  if (o.hasOwnProperty(current.state)) {
    o[current.state] += Math.round(parseInt(current.amount));
  } else {
    o[current.state] = Math.round(parseInt(current.amount));
  }
  return o;
}, {});

/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
// filter to get the states (keys) that is needed in array of states
// use the array and stateSums to find the sumOfHighInterest
var sumOfHighInterests = Object.keys(stateSums)
  .filter(state => !["WI", "IL", "WY", "OH", "GA", "DE"].includes(state))
  .reduce((sum, c) => {
    if (Math.round(stateSums[c] * 0.189) > 50000) {
      sum += Math.round(stateSums[c] * 0.189);
    }
    return sum;
  }, 0);

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = bankBalances.reduce((arr, c) => {
  if (stateSums[c.state] < 1000000 && !arr.includes(c.state)) {
    arr.push(c.state);
  }
  return arr;
}, []);

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = Object.keys(stateSums).reduce((sum, c) => {
  if (stateSums[c] > 1000000) {
    sum += stateSums[c];
  }
  return sum;
}, 0);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = ["WI", "IL", "WY", "OH", "GA", "DE"].every(
  state => stateSums[state] > 2550000
);

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = ["WI", "IL", "WY", "OH", "GA", "DE"].some(
  state => stateSums[state] > 2550000
);

module.exports = {
  hundredThousandairs: hundredThousandairs,
  sumOfBankBalances: sumOfBankBalances,
  sumOfInterests: sumOfInterests,
  sumOfHighInterests: sumOfHighInterests,
  stateSums: stateSums,
  lowerSumStates: lowerSumStates,
  higherStateSums: higherStateSums,
  areStatesInHigherStateSum: areStatesInHigherStateSum,
  anyStatesInHigherStateSum: anyStatesInHigherStateSum
};
