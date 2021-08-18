'use strict';

const validator = (req, res, next) => {
  if (req.query.name) {
    console.log('name is on the query string');
    next();
  } else {
    console.log('error: no name on query string')
    next('error: no name on query string');
  }
}

module.exports = validator;