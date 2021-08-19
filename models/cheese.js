'use strict';

const Cheese = (sequelize, DataTypes) => sequelize.define('Cheese', {
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  flavor: {
    type: DataTypes.STRING,
  }
});

module.exports = Cheese;