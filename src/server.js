'use strict'

const express = require('express');
const app = express();
const notFoundHandler = require('./error-handlers/404.js')
const errors = require('./error-handlers/500.js');
const nameVal = require('./middleware/validator.js');
const logger = require('./middleware/logger.js');

app.get('/person', logger, nameVal, (req,res) => {
  if (req.query.name) {
    nameObj = {
      name : req.query.name
    }
    res.status(200).send(nameObj)
  } else {
    res.status(500).send()
  }
})

app.get('/500-route', logger, (req, res) => {
  throw new Error('500 error route')
})

app.get('*', notFoundHandler)
app.use(errors)

module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => {
      console.log(`server up: ${port}`)
    })
  }
}