'use strict';

const express = require('express');
const { Meat } = require('../models/index.js');

const meatRoutes = express.Router();

meatRoutes.get('/meat', getMeat);
meatRoutes.get('meat/:id', getOneMeat);
meatRoutes.post('/meat', createMeat);
meatRoutes.put('/meat/:id', updateMeat);
meatRoutes.delete('meat/:id', deleteMeat);

async function getMeat(req,res) {
  let meats = await Meat.findAll();
  res.status(200).json(meats);
}

async function getOneMeat(req,res) {
  const id = parseInt(req.params.id);
  let meat = Meat.findOne({ where: { id: id }});
  res.status(200).json(meat);
}

async function createMeat(req,res) {
  let meat = await Meat.create(req.body);
  res.status(201).json(meat);
}

async function updateMeat(req,res) {
  const id = parseInt(req.params.id);
  let meat = await meat.findOne({ where: { id: id }});
  let updatedMeat = await meat.update(req.body);
  res.status(202).json(updatedMeat);
}

async function deleteMeat(req,res) {
  const id = parseInt(req.params.id);
  let meat = await Meat.destroy({ where: { id: id }});
  res.status(204).json(meat);
}

module.exports = meatRoutes;