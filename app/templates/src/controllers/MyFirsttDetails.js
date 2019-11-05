'use strict';

var utils = require('../utils/writer.js');
var MyFirsttDetailsService = require('../services/MyFirsttDetailsService');

module.exports.myFirsttDetails = function myFirsttDetails (req, res) {
	var test = req.swagger.params['test'].value;
	MyFirsttDetailsService.myFirsttDetailsService(test, res)
		.then(function (response) {
			utils.writeJson(res, response);
		})
		.catch(function (response) {
			utils.writeJson(res, response, response.status);
		});
};
