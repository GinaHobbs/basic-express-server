'use strict'

const express = require('express');
const app = express();
const notFoundHandler = require('./error-handlers/404.js')
const errors = require('./error-handlers/500.js');
const nameVal = require('./middleware/validator.js');
const logger = require('./middleware/logger.js');
const cheeseRoutes = require('../routes/cheese.js');
const meatRoutes = require('../routes/meat.js');
const cheeseSchema = require('../models/cheese.js')
const meatSchema = require('../models/meat.js');

app.use(express.json());

app.get('/test', (req, res) => {
  console.log('string');
  res.status(200).send('string');
})

app.use(cheeseRoutes);
app.use(meatRoutes);



app.get('/person', logger, nameVal, (req,res) => {
  console.log(req.query)
    const nameObj = {
      name : req.query.name
    }
    console.log(nameObj)
    res.status(200).send(nameObj)
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