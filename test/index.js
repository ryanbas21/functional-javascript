const test = require('blue-tape');
const {
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
  subtract,
  divide,
  multiply,
  pluck,
  contains,
  slice,
  uniq,
  range,
  delay,
  reduceRight,
  dropRight,
  reject,
  zip,
} = require('../lib/index.js');

test('should test compose', (assert) => {
  const cb1 = num => num + 1;
  const cb2 = num => num - 2;
  const cb3 = num => num * 1;
  const msg = 'should compose the functions right to left';
  const actual = compose(cb1, cb2, cb3)(10);
  const expected = 9;
  console.log(actual);
  assert.same(actual, expected, msg);
  assert.end();
});
test('should test pipe', (assert) => {
  const cb1 = num => num + 1;
  const cb2 = num => num - 2;
  const cb3 = num => num * 1;
  const msg = 'should pipe the functions left to right';
  const actual = compose(cb1, cb2, cb3)(10);
  const expected = 9;
  console.log(actual);
  assert.same(actual, expected, msg);
  assert.end();
});

test('should test every', (assert) => {
  const msg = 'every item should pass';
  const actual = every(num => num < 5, [1, 2, 3, 4]);
  const expected = true;

  assert.same(actual, expected, msg);
  assert.end();
});

test('should test some', (assert) => {
  const msg = 'some items should pass resulting in true';
  const actual = some(num => num < 5, [1, 2, 5, 7, 8, 10]);
  const expected = true;

  assert.same(actual, expected, msg);
  assert.end();
});

test('should test reduce', (assert) => {
  const msg = 'reduce should add accumulate the array';
  const actual = reduce((acc, curr) => acc + curr, 0, [1, 2, 3, 4, 5, 6]);
  const expected = 21;

  assert.same(actual, expected, msg);
  assert.end();
});

test('reduce should work with objects', (assert) => {
  const msg = 'reduce should work with objects';
  const cb = (acc, curr) => {
    if (acc[curr] === undefined) acc[curr] = curr;
    return acc;
  };
  const actual = reduce(cb, {}, ['ryan', 'eric', 'paul', 'lourdes']);
  const expected = {
    ryan: 'ryan',
    eric: 'eric',
    paul: 'paul',
    lourdes: 'lourdes',
  };

  assert.deepEqual(actual, expected, msg);
  assert.end();
});

test('should test filter', (assert) => {
  const msg = 'should filter out words less than 5 chars long';
  const actual = filter(word => word.length < 5, [
    'ryan',
    'testing',
    'filter',
    'mike',
  ]);
  const expected = ['ryan', 'mike'];

  assert.same(actual, expected, msg);
  assert.end();
});

test('should test add2', (assert) => {
  const msg = 'should add two numbers together';
  const actual = add2(5)(6);
  const expected = 11;

  assert.same(actual, expected, msg);
  assert.end();
});

test('add2 should return a function', (assert) => {
  const msg = 'should return a function';
  const actual = typeof add2(5);
  const expected = 'function';

  assert.same(actual, expected, msg);
  assert.end();
});

test('map should return an array with a callback applied', (assert) => {
  const msg = 'map should return an array';
  const actual = map(num => num + 2, [1, 2, 3]);
  const expected = [3, 4, 5];

  assert.same(actual, expected, msg);
  assert.end();
});

test('increment should increment by 1', (assert) => {
  const msg = 'should increment by one';
  const actual = increment(1);
  const expected = 2;

  assert.same(actual, expected, msg);
  assert.end();
});

test('should make a string lower case', (assert) => {
  const msg = 'should turn a string to lower case';
  const actual = toLower('TEST');
  const expected = 'test';

  assert.same(actual, expected, msg);
  assert.end();
});

test('should take n from list', (assert) => {
  const msg = 'should take the first n items from array';
  const actual = take(5, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const expected = [1, 2, 3, 4, 5];

  assert.same(actual, expected, msg);
  assert.end();
});

test('should sum all numbers together', (assert) => {
  const msg = 'should sum up an array';
  const actual = sum([1, 2, 3, 4]);
  const expected = 10;

  assert.same(actual, expected, msg);
  assert.end();
});

test('should subtract all the numbers', (assert) => {
  const msg = 'should reduce the array';
  const actual = subtract(20, [1, 2, 3, 4]);
  const expected = 10;

  assert.same(actual, expected, msg);
  assert.end();
});

test('should multiply all the numbers in the list', (assert) => {
  const msg = 'should multiply the numbers in the list';
  const actual = multiply(1, [1, 2, 3, 4]);
  const expected = 24;

  assert.same(actual, expected, msg);
  assert.end();
});

test('should divide all the numbers in the list', (assert) => {
  const msg = 'should divide the numbers';
  const actual = divide(1, [2, 4, 6]);
  const expected = 3;

  assert.same(actual, expected, msg);
  assert.end();
});

test('should pluck from an array', (assert) => {
  const arr = [
    { name: 'moe', age: 40 },
    { name: 'homer', age: 38 },
    { name: 'Sideshow Bob', age: 27 },
  ];
  const msg = 'should pluck items from the array';
  const actual = pluck(arr, 'name');
  const expected = ['moe', 'homer', 'Sideshow Bob'];

  assert.same(actual, expected, msg);
  assert.end();
});

test('should slice an array', (assert) => {
  const msg = 'should slice an array with a start/end';
  const arr = [1, 2, 3, 4, 5, 6];
  const actual = slice(1, 4, arr);
  const expected = [2, 3, 4];

  assert.same(actual, expected, msg);
  assert.end();
});

test('should test if item is contained in an array', (assert) => {
  const msg = 'should return boolean if item is in collection';
  const actual = contains('sam', [1, 3, 'sam', 'mike']);
  const expected = true;

  assert.same(actual, expected, msg);
  assert.end();
});

test('should return a new set of unique values', (assert) => {
  const msg = 'should return an array of unique values';
  const actual = uniq([1, 1, 1, 2, 4, 5, 5, 5, 6, 7, 7, 8, 8, 89]);
  const expected = [1, 2, 4, 5, 6, 7, 8, 89];

  assert.same(actual, expected, msg);
  assert.end();
});

test('should create a range', (assert) => {
  const msg = 'Should create an array from n to y';
  const actual = range(0, 10);
  const expected = [...Array(10).keys()];

  assert.same(actual, expected, msg);
  assert.end();
});

test('should test reduceRight', (assert) => {
  const msg = 'reduceRight should add accumulate the array';
  const actual = reduceRight((acc, curr) => acc + curr, 0, [1, 2, 3, 4, 5, 6]);
  const expected = 21;

  assert.same(actual, expected, msg);
  assert.end();
});

test('reduce should work with objects', (assert) => {
  const msg = 'reduceRight should work with objects';
  const cb = (acc, curr) => {
    if (acc[curr] === undefined) acc[curr] = curr;
    return acc;
  };
  const actual = reduceRight(cb, {}, ['ryan', 'eric', 'paul', 'lourdes']);
  const expected = {
    ryan: 'ryan',
    eric: 'eric',
    paul: 'paul',
    lourdes: 'lourdes',
  };

  assert.deepEqual(actual, expected, msg);
  assert.end();
});

test('should test drop right', (assert) => {
  const msg = 'should drop 3 elements from the right';
  const actual = dropRight(3, [1, 2, 3, 4, 5, 6, 7]);
  const expected = [1, 2, 3, 4];

  assert.same(actual, expected, msg);
  assert.end();
});

test('should test filter', (assert) => {
  const msg = 'should filter out words less than 5 chars long';
  const actual = reject(word => word.length < 5, [
    'ryan',
    'testing',
    'filter',
    'mike',
  ]);
  const expected = ['testing', 'filter'];

  assert.same(actual, expected, msg);
  assert.end();
});

test('Should test zip', (assert) => {
  const msg = 'should zip together the arrays';
  const expected = [['a', 1, true], ['b', 2, false]];
  const actual = zip(['a', 'b'], [1, 2], [true, false]);

  assert.same(actual, expected, msg);
  assert.end();
});

