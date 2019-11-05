'use strict';

// Initialize the logger, other global resources
require('../../../src/app.js');
// Raise the log level
// logger.transports.console.level = "WARN";

const chai = require('chai');
const expect = chai.expect;
const httpMocks = require('node-mocks-http');

global.config = require('nextgen-module-config');
const statusService = require('../../../src/services/StatusService.js');

// Create a fake response object
const res = httpMocks.createResponse();

describe('LiveStatusChecks - Proper Requests Through the Service', () => {
	it('properLiveStatusCheck', (done) => {
		let results = {};

		let response = statusService.getLiveStatus(res);
		response.then((data) => {
			results = data;
			expect(results.Live).equals(true);
			done();
		}).catch(err => {
			// An promise error was caught
			console.error("Encountered error in properLiveStatusCheck: " + JSON.stringify(err));
			console.error(JSON.stringify(err));
			expect(results.Live).equals(true);
			done();
		});
	});


	it('properReadyStatusCheck', (done) => {
		let results = {};

		let response = statusService.getReadyStatus(res);
		response.then((data) => {
			results = data;
			expect(results.Ready).equals(true);
			done();
		}).catch(err => {
			// An promise error was caught
			console.error("Encountered error in properReadyStatusCheck: " + JSON.stringify(err));
			console.error(JSON.stringify(err));
			expect(results.Ready).equals(true);
			done();
		});
	});
});
