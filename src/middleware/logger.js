'use strict';

const logger = (req, res, next) => {
  if (req.path) {
    console.log('req.path:', req.path);
    next();
  } else {
    console.log('no path specified')
    next('no path specified');
  }
}

module.exports = logger;