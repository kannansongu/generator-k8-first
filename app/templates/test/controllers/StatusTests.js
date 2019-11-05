'use strict';

// Initialize the logger, other global resources
require('../../src/app.js');
// Raise the log level
logger.transports.console.level = "WARN";

const httpMocks = require('node-mocks-http');
const chai = require('chai');
const expect = chai.expect;

const status = require('../../src/controllers/Status.js');

// Create a fake response object
const req = httpMocks.createRequest();
const res = httpMocks.createResponse();

describe('StatusChecks - Proper Requests Through the Controller', () => {
	it('properLiveStatusCheck', (done) => {
		let results = {};

		let response = status.getLiveStatus(req,res,null);
		console.log(response);

	});


	it('properReadyStatusCheck', (done) => {
		let results = {};

		let response = status.getReadyStatus({},res, (data) => {
			results = data;
		});
		response.then((data) => {
			results = data;
			expect(results.Ready).equals(true);
			done();
		}).catch(err => {
			// An promise error was caught
			console.error("Encountered error in properReadyStatusCheck: " + JSON.stringify(err));
			console.error(err);
			expect(results.Ready).equals(true);
			done();
		});
	});
});
