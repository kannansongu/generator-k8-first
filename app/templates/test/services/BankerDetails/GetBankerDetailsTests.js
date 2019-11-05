'use strict';

// Initialize the logger, other global resources
global.skipStartServer = true;
require('../../../src/app.js');
// Raise the log level
logger.transports.console.level = "WARN";

const chai = require('chai');
const assert = chai.assert;

const httpMocks = require('node-mocks-http');
const env = process.env.ENVIRONMENT.toLowerCase();
const testData = require('./data.json')[env];
if (testData == null) {
	console.error("Test data for environment " + env + " not found.");
}

global.config = require('nextgen-module-config');
const bankerDetails = require('../../../src/services/BankerDetailsService.js').bankerDetails;
const parser = require('../../../src/services/BankerDetailsService.js').getBankerAndRM;

// Create a fake response object
const res = httpMocks.createResponse();

//Generate one token to be used for the tests because it lasts a while
const tokenFunctions = require('nextgen-module-token');


describe('bankerDetails - Proper Requests', () => {
	let token;
	before(() => {
		return new Promise((resolve, reject) => {
			tokenFunctions.requestToken(data => {
				if (data.status == 200 && data.token != null) {
					token = data.token;
					// console.log("Got token: " + JSON.stringify(token));
					resolve('got token');
				} else {
					console.error("Could not get token");
					reject('failed to get token');
				}
			});
		});
	});

	it('testValidRoles1', (done) => {
		const input = testData['testValidRoles1']['response'];
		let response = parser(input);

		assert.equal(response["RMInitials"], "JRC");
		assert.equal(response["BankerInitials"], "JRC");
		assert.equal(response.hasOwnProperty('error'), false);

		done();
	});

	it('testValidRoles2', (done) => {
		const input = testData['testValidRoles2']['response'];
		let response = parser(input);

		assert.equal(response["RMInitials"], "JRC");
		assert.equal(response["BankerInitials"], "JRC");
		assert.equal(response.hasOwnProperty('error'), false);

		done();
	});

	it('testValidRoles3', (done) => {
		const input = testData['testValidRoles3']['response'];
		let response = parser(input);

		assert.equal(response["RMInitials"], "JRC");
		assert.equal(response["BankerInitials"], "NSA");
		assert.equal(response.hasOwnProperty('error'), false);

		done();
	});

	it('testValidRoles4', (done) => {
		const input = testData['testValidRoles4']['response'];
		let response = parser(input);

		assert.equal(response["RMInitials"], "JRC");
		assert.equal(response["BankerInitials"], "NSA");
		assert.equal(response.hasOwnProperty('error'), false);

		done();
	});

	it('testValidRoles5', (done) => {
		const input = testData['testValidRoles5']['response'];
		let response = parser(input);

		assert.equal(response["RMInitials"], "JRC");
		assert.equal(response["BankerInitials"], "JRC");
		assert.equal(response.hasOwnProperty('error'), false);

		done();
	});

	it('testValidRoles6', (done) => {
		const input = testData['testValidRoles6']['response'];
		let response = parser(input);

		assert.equal(response["RMInitials"], "JRC");
		assert.equal(response["BankerInitials"], "NSA");
		assert.equal(response.hasOwnProperty('error'), false);

		done();
	});

	it('testValidRoles7', (done) => {
		const input = testData['testValidRoles7']['response'];
		let response = parser(input);

		assert.equal(response["RMInitials"], "JRC");
		assert.equal(response["BankerInitials"], "RBP");
		assert.equal(response.hasOwnProperty('error'), false);

		done();
	});

	it('testValidRoles8', (done) => {
		const input = testData['testValidRoles8']['response'];
		let response = parser(input);

		assert.equal(response["RMInitials"], "JRC");
		assert.equal(response.hasOwnProperty('BankerInitials'), false);
		assert.equal(response.hasOwnProperty('error'), true);

		done();
	});

	it('testValidRoles9', (done) => {
		const input = testData['testValidRoles9']['response'];
		let response = parser(input);

		assert.equal(response["RMInitials"], "JRC");
		assert.equal(response.hasOwnProperty('BankerInitials'), false);
		assert.equal(response.hasOwnProperty('error'), true);

		done();
	});

	it('testValidRoles10', (done) => {
		const input = testData['testValidRoles10']['response'];
		let response = parser(input);

		assert.equal(response["RMInitials"], "GT");
		assert.equal(response.hasOwnProperty('BankerInitials'), false);
		assert.equal(response.hasOwnProperty('error'), true);

		done();
	});

	it('testValidRoles11', (done) => {
		const input = testData['testValidRoles11']['response'];
		let response = parser(input);

		assert.equal(response.hasOwnProperty('RMInitials'), false);
		assert.equal(response["BankerInitials"], "NSA");
		assert.equal(response.hasOwnProperty('error'), false);

		done();
	});

	it('testValidRoles12', (done) => {
		const input = testData['testValidRoles12']['response'];
		let response = parser(input);

		assert.equal(response["RMInitials"], "GT");
		assert.equal(response["BankerInitials"], "NSA");
		assert.equal(response.hasOwnProperty('error'), false);

		done();
	});

	it('testValidRoles13', (done) => {
		const input = testData['testValidRoles13']['response'];
		let response = parser(input);

		assert.equal(response["RMInitials"], "JRC");
		assert.equal(response["BankerInitials"], "NSA");
		assert.equal(response.hasOwnProperty('error'), false);

		done();
	});

	it('testInvalidRoles1', (done) => {
		const input = testData['testInvalidRoles1']['response'];
		let response = parser(input);

		assert.equal(response.hasOwnProperty('RMInitials'), false);
		assert.equal(response.hasOwnProperty('BankerInitials'), false);
		assert.equal(response.hasOwnProperty('error'), true);

		done();
	});

	// it('properRequestWithValidGCID', (done) => {
	// 	let results = {};
    //
	// 	const gcid = testData['properRequestWithValidGCID']['params']['inputParams']['gcid'];
	// 	const correlationId = testData['properRequestWithValidGCID']['params']['correlationId'];
	// 	const authToken = "Bearer " + token;
    //
	// 	let response = bankerDetails(authToken, correlationId, gcid, res);
	// 	response.then((data) => {
	// 		results = data;
	// 		// assert.equal(results.status).equals(testData['properRequestWithValidGCID']['assert.equaled_results']['response_code']);
	// 		assert.equal(results.hasOwnProperty('FormInstanceKey') === true);
	// 		done();
	// 	}).catch(err => {
	// 		assert.equal(err.status).equals(testData['properRequestWithValidGCID']['assert.equaled_results']['response_code']);
	// 		done();
	// 	});
	// });
});

describe('bankerDetails - Improper Requests', () => {
	let token;
	before(() => {
		return new Promise((resolve, reject) => {
			tokenFunctions.requestToken(data => {
				if (data.status == 200 && data.token != null) {
					token = data.token;
					// console.log("Got token: " + JSON.stringify(token));
					resolve('got token');
				} else {
					console.error("Could not get token");
					reject('failed to get token');
				}
			});
		});
	});

	// it('improperRequestMalformedGCID', (done) => {
	// 	let results = {};
	// 	const gcid = testData['improperRequestMalformedGCID']['params']['inputParams']['gcid'];
	// 	const correlationId = testData['improperRequestMalformedGCID']['params']['correlationId'];
	// 	const authToken = "Bearer " + token;
    //
	// 	let response = bankerDetails(authToken, correlationId, gcid, res);
	// 	response.then((data) => {
	// 		results = data;
	// 		assert.equal(results.status).equals(testData['improperRequestMalformedGCID']['assert.equaled_results']['response_code']);
	// 		done();
	// 	}).catch(err => {
	// 		assert.equal(err.status).equals(testData['improperRequestMalformedGCID']['assert.equaled_results']['response_code']);
	// 		done();
	// 	});
	// });
    //
	// it('improperRequestUnknownGCID', (done) => {
	// 	let results = {};
	// 	const gcid = testData['improperRequestUnknownGCID']['params']['inputParams']['gcid'];
	// 	const correlationId = testData['improperRequestUnknownGCID']['params']['correlationId'];
	// 	const authToken = "Bearer " + token;
    //
	// 	let response = bankerDetails(authToken, correlationId, gcid, res);
	// 	response.then((data) => {
	// 		results = data;
	// 		assert.equal(results.status).equals(testData['improperRequestUnknownGCID']['assert.equaled_results']['response_code']);
	// 		done();
	// 	}).catch(err => {
	// 		assert.equal(err.status).equals(testData['improperRequestUnknownGCID']['assert.equaled_results']['response_code']);
	// 		done();
	// 	});
	// });
});
