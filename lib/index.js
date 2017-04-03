/**
 *  slice from start, to an end value
 *
 *  @param  {[type]} start [description]
 *  @param  {[type]} end [description]
 *  @param  {[type]} arr [description]
 *  @param  {Array} [newArr=[]] [description]
 *
 *  @return {[type]} [description]
 */
const slice = (start, end, arr, newArr = []) => {
  if (start === end) return newArr;
  newArr = newArr.concat(arr[start]);
  return slice(start + 1, end, arr, newArr);
};
/**
 *  @param  {[Function]} reducer [function to be applied]
 *  @param  {[any]} initial [starting value]
 *  @param  {[array]} arr [iterable]
 *
 *  @return {[type]} [accumulated value]
 */
const reduce = (reducer, initial, arr) => {
  if (!arr.length) return initial;
  let acc = initial;
  acc = reducer(acc, arr[0]);
  return reduce(reducer, acc, slice(1, arr.length, arr));
};
/**
 *
 * @param {*funciton} reducer function to be applied from out, inward
 * @param {*intiial value} initial starting value
 * @param {*array} arr array to be iterated
 */
const reduceRight = (reducer, initial, arr) => {
  if (!arr.length) return initial;
  let acc = initial;
  acc = reducer(acc, arr[arr.length - 1]);
  return reduceRight(reducer, acc, slice(0, arr.length - 1, arr));
};
/**
 *  Compose Function
 *  @param  {...fns} fns [array of functions]
 *  @return {function} [function which reduces
 *  the array of functions, applying the result of the last applied
 *  function to the next]
 */
const compose = (...args) => x => reduceRight((acc, fn) => fn(acc), x, args);
/**
 *  Trace Function
 *  @param  {string} label description of value
 *  @return { function } [returns a function that logs out a string label:value
 *  and then returns the value]
 */
const trace = label =>
  (value) => {
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
 *  Pipe Function
 *  @param  {...fns} fns turns arguments into an array of functions
 *  @return {[type]} [description]
 */
const pipe = (...args) => x => reduce((acc, fn) => fn(acc), x, args);
/**
 *  @param  {Function} fn [predicate]
 *  @param  {[array]} arr [array to be filtered]
 *
 *  @return {[array]} [filtered array]
 */
const filter = (fn, arr) =>
  reduce((acc, item) => fn(item) ? acc.concat([item]) : acc, [], arr);
/**
 *  [map description]
 *
 *  @param  {Function} fn [callback to be applied]
 *  @param  {array} arr array to be iterated
 *  @return {[type]} [new array of applied elements]
 */
const map = (fn, arr) =>
  reduce((acc, element) => acc.concat([fn(element)]), [], arr);
/**
 *  @param  {Function} fn [callback to be applied]
 *  @param  {[ array ]} arr [iterable]
 *  @return {[boolean]} [whether the every element passes the predicate]
 */
const every = (fn, arr) => {
  if (!arr.length) return true;
  if (!fn(arr[0])) return false;
  return every(fn, slice(1, arr.length, arr));
};
/**
 *  Returns true if some of the items in the array pass the predicate
 *
 *  @param  {Function} fn callback to be invoked on element
 *  @param  {[array]} arr iterable array
 *
 *  @return {boolean} true or false boolean
 */
const some = (fn, arr) => {
  if (!arr.length) return false;
  if (fn(arr[0])) return true;
  return some(fn, slice(1, arr.length, arr));
};
/**
 *  functional toLowerCase
 *
 *  @param  {string} str string to turn lower
 *
 *  @return {string} string in all lower case
 */

const toLower = str => str.toLowerCase();
/**
 *  take n elements from front of an array
 *
 *  @param  {numbers} num [number of elements to take from front of array]
 *  @param  {[Array]} arr [array iterable]
 *
 *  @return {[type]} [description]
 */
const take = (num, arr) => slice(0, num, arr);
/**
 *  Sum up an array
 *
 *  @param  {array} arr array to sum up
 *
 *  @return {[number]} [sum of array]
 */
const sum = arr => reduce((prev, curr) => prev + curr, 0, arr);
/**
 *  multiply an array
 *
 *  @param  {number} [start=1] starting value
 *  @param  {array} arr iterable
 *
 *  @return {number} product of values
 */
const multiply = (start = 1, arr) =>
  reduce((prev, curr) => prev * curr, start, arr);
/**
   *  divise an array
   *
   *  @param  {number} [start=1] [description]
   *  @param  {[array]} arr [description]
   *
   *  @return {[number]} [description]
   */
const divide = (start = 1, arr) =>
  reduce((prev, curr) => curr / prev, start, arr);
/**
   *  subtract an array
   *
   *  @param  {number} start starting value
   *  @param  {array} arr iterable
   *
   *  @return {number} difference from starting value and array
   */
const subtract = (start, arr) =>
  reduce((prev, curr) => prev - curr, start, arr);
/**
 *  [pluck description]
 *
 *  @param  {[type]} arr [iterable of {}]
 *  @param  {[type]} propertyName [property to pluck off object]
 *
 *  @return {[type]} array of plucked items
 */
const pluck = (arr, propertyName) => {
  const cb = (prev, curr) => {
    if (curr[propertyName]) prev = prev.concat([curr[propertyName]]);
    return prev;
  };
  return reduce(cb, [], arr);
};
/**
 *  Check if Item is in an array
 *
 *  @param  {any} item to search for
 *  @param  {array} arr iterable array
 *
 *  @return {boolean} true or false if contains item
 */
const contains = (item, arr) => {
  if (!arr.length) return false;
  if (arr[0] === item) return true;
  return contains(item, slice(1, arr.length, arr));
};
/**
 *  returns an array of unique values
 *
 *  @param  {[array]} arr [iterable array]
 *  @param  {array} [newArr=[]] [array to add unique values to]
 *
 *  @return {[array]} [array of unique values]
 */
const uniq = (arr, newArr = []) => {
  if (!arr.length) return newArr;
  if (!contains(arr[0], newArr)) newArr.push(arr[0]);
  return uniq(slice(1, arr.length, arr), newArr);
};
/**
 *  Range function
 *
 *  @param  {number} [start=0] starting value, defaults to 0
 *  @param  {end} end where to end, required
 *  @param  {Array} [arr=[]] hidden array
 *
 *  @return {array} array of created range
 */
const range = (start = 0, end, arr = []) => {
  if (end === undefined) throw new Error('Must supply an end value');
  if (start === end) return arr;
  const newArr = arr;
  newArr[newArr.length] = start;
  return range((start += 1), end, newArr);
};
/**
 *  [forEach description]
 *
 *  @param  {Function} cb apply a callback on each element
 *  @param  {iterable} arr iterable array
 *
 *  @return {void} no return value
 */
const forEach = (cb, arr) => {
  if (!arr.length) return;
  cb(arr[0]);
  return forEach(cb, slice(1, arr.length, arr));
};
/**
 *  get identity of an arguments
 *
 *  @param  {any} arg [argument to get identity of]
 *
 *  @return {[type]} [argument passed in]
 */
const identity = arg => arg;
/**
 *  get the difference between two arrays
 *
 *  @param  {array} first first array
 *  @param  {array} second second array
 *  @param  {number} [idx=0] hidden, do not pass in
 *  @param  {Array} [out=[]] unique values/ differences array
 *
 *  @return {[type]} out Array when there are no more differences
 */
const difference = (first, second, idx = 0, out = []) => {
  const firstLen = first.length;
  if (idx < firstLen) {
    if (!contains(first[idx], second) && !contains(first[idx], out)) {
      out[out.length] = first[idx];
    }
  } else {
    return out;
  }
  idx += 1;
  return difference(first, second, idx, out);
};

//practice blue-tape test
const delay = () => {
  const promise = new Promise((resolve, reject) => setTimeout(function (){
    resolve('Success!');
  }, 250));
  return promise;
};

module.exports = {
  pluck,
  some,
  every,
  reduce,
  map,
  compose,
  pipe,
  filter,
  add2,
  increment,
  toLower,
  take,
  sum,
  multiply,
  divide,
  subtract,
  contains,
  slice,
  uniq,
  range,
  delay,
  reduceRight
};
