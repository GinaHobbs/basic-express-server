'use strict'

module.exports = function internalServerError(err, req, res, next) {
  errorObj = {
    status: 500,
    message: err.message
  }
  res.status(500).send(errorObj);
}