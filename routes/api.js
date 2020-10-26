/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      function treatBadRequest(isValidNum, isValidUnit) {
        if (!isValidNum && !isValidUnit) {
          return res
            // .status(400)
            .json('invalid number and unit');
        }

        if (!isValidNum) {
          return res
            // .status(400)
            .json('invalid number');
        }

        if (!isValidUnit) {
          return res
            // .status(400)
            .json('invalid unit');
        }
      }

      var input = req.query.input.toLowerCase();
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      treatBadRequest(!!initNum, !!initUnit);

      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      return res.json({ initNum, initUnit, returnNum, returnUnit, string });
    });

};
