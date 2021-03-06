'use strict'

const Model = require('trails-model')

/**
 * @module Device
 * @description Device model
 */
module.exports = class Device extends Model {

  static config () {
    return {
      options: {
        classMethods: {
          associate: (models) => {
            models.Device.belongsTo(models.Plugin, {
              as: 'plugin',
              onDelete: 'CASCADE',
              foreignKey: {
                name: 'pluginName',
                allowNull: false
              }
            })
          }
        }
      }
    }
  }


  static schema (app, Sequelize) {
    return {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      data: {
        type: Sequelize.STRING,
        get: function () {
          return JSON.parse(this.getDataValue('data'))
        },
        set: function (value) {
          this.setDataValue('data', JSON.stringify(value))
        }
      }
    }
  }
}
