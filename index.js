
// compose(...fns: [...Function]) => Function
const compose = (...args) => x => args.reduceRight( (acc, fn) => fn(acc), x);

//pipe(...fns: [...Function]) => Function
const pipe = (...args) => x => args.reduce((args, fn) => fn(acc), x);

// trace(label: Any) => (value: v) => v, effects(log label:value to console)
const trace = label => value => {
  console.log(`${label}: ${value}`);
  return value;
};

// add2(a) => b => Number
const add = a => b => a + b;

//increment
const increment = add(1);

//
