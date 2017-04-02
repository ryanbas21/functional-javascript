const test = require('tape');
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
} = require('../lib/index.js');

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
