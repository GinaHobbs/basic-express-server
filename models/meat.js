'use strict';

const Meat = (sequelize, DataTypes) => sequelize.define('Meat', {
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cured: {
    type: DataTypes.BOOLEAN,
  }
});

module.exports = Meat;