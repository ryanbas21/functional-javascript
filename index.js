 /**
 *  Compose Function
 *  @param  {...fns} fns [array of functions]
 *  @return {function} [function which reduces
 *  the array of functions, applying the result of the last applied
 *  function to the next]
 */
 const compose = (...args) => x => args.reduceRight((acc, fn) => fn(acc), x);
 /**
 *  Pipe Function
 *  @param  {...fns} fns turns arguments into an array of functions
 *  @return {[type]} [description]
 */
 const pipe = (...args) => x => args.reduce((acc, fn) => fn(acc), x);
/**
 *  Trace Function
 *  @param  {string} label description of value
 *  @return { function } [returns a function that logs out a string label:value
 *  and then returns the value]
 */
 const trace = label => (value) => {
   console.log(`${label}: ${value}`);
   return value;
 };
/**
 *  [add2 function]
 *  @param  {number} a a number
 *  @return {functions} takes a number and returns out the result of adding the two
 */
const add2 = a => b => a + b;
/**
 *  [increment description]
 *
 *  @type {function}
 */
const increment = add2(1);
/**
 *  @param  {[Function]} reducer [function to be applied]
 *  @param  {[any]} initial [starting value]
 *  @param  {[array]} arr [iterable]
 *
 *  @return {[type]} [accumulated value]
 */
const reduce = (reducer, initial, arr) => {
  let acc = initial;
  for (let i = 0; i < arr.length; i += 1) {
    acc = reducer(acc, arr[i]);
  }
  return acc;
};
/**
 *  @param  {Function} fn [predicate]
 *  @param  {[array]} arr [array to be filtered]
 *
 *  @return {[array]} [filtered array]
 */
const filter = (fn, arr) => reduce((acc, item) => fn(item) ? acc.concat([item]) : acc, [], arr);
/**
 *  [map description]
 *
 *  @param  {Function} fn [callback to be applied]
 *  @param  {array} arr array to be iterated
 *  @return {[type]} [new array of applied elements]
 */
const map = (fn, arr) => reduce((acc, element) => acc.concat([fn(element)]), [], arr);
/**
 *  @param  {Function} fn [callback to be applied]
 *  @param  {[ array ]} arr [iterable]
 *  @return {[boolean]} [whether the every element passes the predicate]
 */
const every = (fn, arr) => reduce((acc, element) => fn(element) === true, 0, arr);

const logEvery = trace('should test every');
logEvery(every((num) => num < 5, [1, 2, 3, 4])); // true
logEvery(every((num) => num < 5, [1, 2, 3, 4, 5])); // false
