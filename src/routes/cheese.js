'use strict';

const express = require('express');
const { Cheese } = require('../models/index.js');
const Collection = require('../lib/collection.js')
const cheeseCollection = new Collection(Cheese);
const cheeseRoutes = express.Router();

cheeseRoutes.get('/cheese', getCheese);
cheeseRoutes.get('/cheese/:id', getOneCheese);
cheeseRoutes.post('/cheese', createCheese);
cheeseRoutes.put('/cheese/:id', updateCheese);
cheeseRoutes.delete('/cheese/:id', deleteCheese);

async function getCheese(req, res) {
  // let allCheese = await Cheese.findAll();
  cheeseCollection.read();
  // res.status(200).json(allCheese)
}

async function getOneCheese(req,res) {
  const id = parseInt(req.params.id)
  let cheese = await Cheese.findOne({ where: { id: id }})
  res.status(200).json(cheese);
}

async function createCheese(req,res) {
  cheeseCollection.create(req.body)
  // let cheese = await Cheese.create(req.body);
  // res.status(201).json(cheese);
}

async function updateCheese(req,res) {
  const id = parseInt(req.params.id);
  const obj = req.body;
  let cheese = await Cheese.findOne({ where: { id: id }});
  let updatedCheese = await cheese.update(obj);
  res.status(202).json(updatedCheese);
}

async function deleteCheese(req,res) {
  const id = parseInt(req.params.id);
  let cheese = await Cheese.destroy({ where: { id: id }});
  res.status(204).json(cheese);
}

module.exports = cheeseRoutes;