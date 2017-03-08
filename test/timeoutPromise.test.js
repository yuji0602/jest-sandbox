'use strict';

const timeout = require('./../timeoutPromise');
const co = require('co');

const timeout1sec = timeout(1000);
const timeout2sec = timeout(2000);
const timeout3sec = timeout(3000);

describe('Promise test', () => {
  let originalTimeout;

  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  test('timeout1sec is 1000 millisec', () => {
    return timeout1sec().then((data) => {
      expect(data).toBe(1000);
    });
  });

  test('timeout2sec is 2000 millisec', () => {
    return timeout2sec().then((data) => {
      expect(data).toBe(2000);
    });
  });

  test('timeout3sec is 3000 millisec', () => {
    return timeout3sec().then((data) => {
      expect(data).toBe(3000);
    });
  });

  test('Promise.all', () => {
    return Promise.all([
      timeout3sec(),
      timeout2sec(),
      timeout1sec(),
    ])
      .then((data) => {
        expect(data).toEqual([3000, 2000, 1000]);
      });
  });

  test('co test', () => {
    return co(
      function *() {
        expect(yield timeout1sec()).toBe(1000);
        expect(yield timeout2sec()).toBe(2000);
        expect(yield timeout3sec()).toBe(3000);
      })
      .catch((e) => {
        console.log(e);
        assert.fail(true, true, "例外が発生しました。");
      });
  });
});
