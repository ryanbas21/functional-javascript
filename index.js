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
