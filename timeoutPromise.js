'use strict';

const timeout = (milliSec) => {
  return () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(milliSec);
      }, milliSec);
    });
  };
};

module.exports = timeout;