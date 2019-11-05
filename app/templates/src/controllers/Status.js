'use strict';

var utils = require('../utils/writer.js');
var Status = require('../services/StatusService');

module.exports.getLiveStatus = function getLiveStatus (req, res, next) {
  Status.getLiveStatus()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getReadyStatus = function getReadyStatus (req, res, next) {
  Status.getReadyStatus()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
