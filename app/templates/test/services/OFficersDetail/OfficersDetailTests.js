'use strict';

// Initialize the logger, other global resources
global.skipStartServer = true;
require('../../../src/app.js');
// Raise the log level
logger.transports.console.level = "WARN";

const chai = require('chai');
const expect = chai.expect;

const httpMocks = require('node-mocks-http');
const env = process.env.ENVIRONMENT.toLowerCase();
const testData = require('./data.json')[env];
if (testData == null) {
	console.error("Test data for environment " + env + " not found.");
}

global.config = require('nextgen-module-config');
const officersDetailService = require('../../../src/services/OfficersDetailService.js').getOfficersDetail;
const upsertOfficersDetailService = require('../../../src/services/OfficersDetailService.js').putOfficersDetail;

// Create a fake response object
const res = httpMocks.createResponse();

//Generate one token to be used for the tests because it lasts a while
const tokenFunctions = require('nextgen-module-token');

describe('OfficersDetail - Proper Requests', () => {
	let token;
	before(() => {
		return new Promise((resolve, reject) => {
			tokenFunctions.requestToken(data => {
				if (data.status == 200 && data.token != null) {
					token = data.token;
					//console.log("Got token: " + JSON.stringify(token));
					resolve('got token');
				} else {
					console.error("Could not get token");
					reject('failed to get token');
				}
			});
		});
	});

	it('properRequestCommaSeparatedInitialsWithStatus_1', (done) => {
		let results = {};

		const initials = testData['properRequestCommaSeparatedInitialsWithStatus_1']['params']['initials'];
		const activeStatus = testData['properRequestCommaSeparatedInitialsWithStatus_1']['params']['activeStatus'];
		const correlationId = testData['properRequestCommaSeparatedInitialsWithStatus_1']['params']['correlationId'];
		const authToken = "Bearer " + token;
		console.log('calling officerDetails with authToken',authToken,'initials',initials,'active',activeStatus);
		let response = officersDetailService(authToken, correlationId, initials, activeStatus);
		response.then((data) => {
			results = data;
			expect(results[0].hasOwnProperty('Email') === true);
			done();
		}).catch(err => {
			expect(err.status).equals(testData['properRequestCommaSeparatedInitialsWithStatus_1']['expected_results']['response_code']);
			done();
		});
	});

	it('properRequestInitialsWithStatus_1', (done) => {
		let results = {};

		const initials = testData['properRequestInitialsWithStatus_1']['params']['initials'];
		const activeStatus = testData['properRequestInitialsWithStatus_1']['params']['activeStatus'];
		const correlationId = testData['properRequestInitialsWithStatus_1']['params']['correlationId'];
		const authToken = "Bearer " + token;
		console.log('calling officerDetails with authToken',authToken,'initials',initials,'active',activeStatus);
		let response = officersDetailService(authToken, correlationId, initials, activeStatus);
		response.then((data) => {
			results = data;
			expect(results[0].hasOwnProperty('Email') === true);
			done();
		}).catch(err => {
			expect(err.status).equals(testData['properRequestInitialsWithStatus_1']['expected_results']['response_code']);
			done();
		});
	});

	it('properRequestAllWithStatus_1', (done) => {
		let results = {};
		const initials = testData['properRequestAllWithStatus_1']['params']['initials'];
		const activeStatus = testData['properRequestAllWithStatus_1']['params']['activeStatus'];
		const correlationId = testData['properRequestAllWithStatus_1']['params']['correlationId'];
		const authToken = "Bearer " + token;

		let response = officersDetailService(authToken, correlationId, initials, activeStatus);

		response.then((data) => {
			results = data;
			expect(results[0].hasOwnProperty('Email') === true);
			done();
		}).catch(err => {
			expect(err.status).equals(testData['properRequestAllWithStatus_1']['expected_results']['response_code']);
			done();
		});
	});

	it('properRequestAllWithStatus_1', (done) => {
		let results = {};
		const initials = testData['properRequestAllWithStatus_1']['params']['initials'];
		const activeStatus = testData['properRequestAllWithStatus_1']['params']['activeStatus'];
		const correlationId = testData['properRequestAllWithStatus_1']['params']['correlationId'];
		const authToken = "Bearer " + token;

		let response = officersDetailService(authToken, correlationId, initials, activeStatus);

		response.then((data) => {
			results = data;
			expect(results[0].hasOwnProperty('Email') === true);
			done();
		}).catch(err => {
			expect(err.status).equals(testData['properRequestAllWithStatus_1']['expected_results']['response_code']);
			done();
		});
	});

	it('successInsertOfficerDetails', (done) => {
		let results = {};
		const dataBody = testData['successInsertOfficerDetails']['officerData'];
		const correlationId = testData['successInsertOfficerDetails']['correlationId'];
		const authToken = "Bearer " + token;

		console.log('Checking successInsertOfficerDetails....');

		let response = upsertOfficersDetailService(authToken, dataBody, correlationId);

		response.then((data) => {
			results = data;
			expect(results[0].hasOwnProperty('Initials') === true);
			done();
		}).catch(err => {
			expect(err.status).equals(testData['successInsertOfficerDetails']['expected_results']['response_code']);
			done();
		});
	});

	it('successUpdateOfficerDetails', (done) => {
		let results = {};
		const dataBody = testData['successUpdateOfficerDetails']['officerData'];
		const correlationId = testData['successUpdateOfficerDetails']['correlationId'];
		const authToken = "Bearer " + token;

		let response = upsertOfficersDetailService(authToken, dataBody, correlationId);

		response.then((data) => {
			results = data;
			expect(results[0].hasOwnProperty('Initials') === true);
			done();
		}).catch(err => {
			expect(err.status).equals(testData['successUpdateOfficerDetails']['expected_results']['response_code']);
			done();
		});
	});
});

describe('OfficersDetail - Improper Requests', () => {
	let token;
	before(() => {
		return new Promise((resolve, reject) => {
			tokenFunctions.requestToken(data => {
				if (data.status == 200 && data.token != null) {
					token = data.token;
					//console.log("Got token: " + JSON.stringify(token));
					resolve('got token');
				} else {
					//console.error("Could not get token");
					reject('failed to get token');
				}
			});
		});
	});
	it('improperRequestNoRecordsFoundInitials', (done) => {
		let results = {};
		const initials = testData['improperRequestNoRecordsFoundInitials']['params']['initials'];
		const activeStatus = testData['improperRequestNoRecordsFoundInitials']['params']['activeStatus'];
		const correlationId = testData['improperRequestNoRecordsFoundInitials']['params']['correlationId'];
		const authToken = "Bearer " + token;

		let response = officersDetailService(authToken, correlationId, initials, activeStatus);

		response.then((data) => {
			console.log("data: ", data);
			results = data;
			expect(results.status).equals(testData['improperRequestNoRecordsFoundInitials']['expected_results']['response_code']);
			done();
		}).catch(err => {
			expect(err.status).equals(testData['improperRequestNoRecordsFoundInitials']['expected_results']['response_code']);
			done();
		});
	});

	it('improperRequestValidationErrorEmptyInitials', (done) => {
		let results = {};
		const initials = testData['improperRequestValidationErrorEmptyInitials']['params']['initials'];
      const activeStatus = testData['improperRequestValidationErrorEmptyInitials']['params']['activeStatus'];
		const correlationId = testData['improperRequestValidationErrorEmptyInitials']['params']['correlationId'];
		const authToken = "Bearer " + token;

		let response = officersDetailService(authToken, correlationId, initials, activeStatus);

		response.then((data) => {
			console.log("data: ", data);
			results = data;
			expect(results.status).equals(testData['improperRequestValidationErrorEmptyInitials']['expected_results']['response_code']);
			done();
		}).catch(err => {
			expect(err.status).equals(testData['improperRequestValidationErrorEmptyInitials']['expected_results']['response_code']);
			done();
		});
	});

	it('improperRequestValidationErrorEmptyStatus', (done) => {
		let results = {};
		const initials = testData['improperRequestValidationErrorEmptyStatus']['params']['initials'];
      const activeStatus = testData['improperRequestValidationErrorEmptyStatus']['params']['activeStatus'];
		const correlationId = testData['improperRequestValidationErrorEmptyStatus']['params']['correlationId'];
		const authToken = "Bearer " + token;

		let response = officersDetailService(authToken, correlationId, initials, activeStatus);
		response.then((data) => {
			results = data;
			expect(results.status).equals(testData['improperRequestValidationErrorEmptyStatus']['expected_results']['response_code']);
			done();
		}).catch(err => {
			expect(err.status).equals(testData['improperRequestValidationErrorEmptyStatus']['expected_results']['response_code']);
			done();
		});
	});

	it('improperRequestInvalidInitials400Error', (done) => {
		let results = {};
		const initials = testData['improperRequestInvalidInitials400Error']['params']['initials'];
		const activeStatus = testData['improperRequestInvalidInitials400Error']['params']['activeStatus'];
		const correlationId = testData['improperRequestInvalidInitials400Error']['params']['correlationId'];
		const authToken = "Bearer " + token;

		let response = officersDetailService(authToken, correlationId, initials, activeStatus);
		response.then((data) => {
			results = data;
			expect(results.status).equals(testData['improperRequestInvalidInitials400Error']['expected_results']['response_code']);
			done();
		}).catch(err => {
			expect(err.status).equals(testData['improperRequestInvalidInitials400Error']['expected_results']['response_code']);
			done();
		});
	});

	it('improperRequestCommaSeparatedInitials400Error', (done) => {
		let results = {};
		const initials = testData['improperRequestCommaSeparatedInitials400Error']['params']['initials'];
		const activeStatus = testData['improperRequestCommaSeparatedInitials400Error']['params']['activeStatus'];
		const correlationId = testData['improperRequestCommaSeparatedInitials400Error']['params']['correlationId'];
		const authToken = "Bearer " + token;

		let response = officersDetailService(authToken, correlationId, initials, activeStatus);
		response.then((data) => {
			results = data;
			expect(results.status).equals(testData['improperRequestCommaSeparatedInitials400Error']['expected_results']['response_code']);
			done();
		}).catch(err => {
			expect(err.status).equals(testData['improperRequestCommaSeparatedInitials400Error']['expected_results']['response_code']);
			done();
		});
	});

	it('improperRequestInitialsMaximumCharLimitExceeds400Error', (done) => {
			let results = {};
			const initials = testData['improperRequestInitialsMaximumCharLimitExceeds400Error']['params']['initials'];
			const activeStatus = testData['improperRequestInitialsMaximumCharLimitExceeds400Error']['params']['activeStatus'];
			const correlationId = testData['improperRequestInitialsMaximumCharLimitExceeds400Error']['params']['correlationId'];
			const authToken = "Bearer " + token;

			let response = officersDetailService(authToken, correlationId, initials, activeStatus);
			response.then((data) => {
				results = data;
				expect(results.status).equals(testData['improperRequestInitialsMaximumCharLimitExceeds400Error']['expected_results']['response_code']);
				done();
			}).catch(err => {
				expect(err.status).equals(testData['improperRequestInitialsMaximumCharLimitExceeds400Error']['expected_results']['response_code']);
				done();
			});
	});

	it('improperRequestInitialsMaximumElementsExceeds400Error', (done) => {
		let results = {};
		const initials = testData['improperRequestInitialsMaximumElementsExceeds400Error']['params']['initials'];
		const activeStatus = testData['improperRequestInitialsMaximumElementsExceeds400Error']['params']['activeStatus'];
		const correlationId = testData['improperRequestInitialsMaximumElementsExceeds400Error']['params']['correlationId'];
		const authToken = "Bearer " + token;

		let response = officersDetailService(authToken, correlationId, initials, activeStatus);
		response.then((data) => {
			results = data;
			expect(results.status).equals(testData['improperRequestInitialsMaximumElementsExceeds400Error']['expected_results']['response_code']);
			done();
		}).catch(err => {
			expect(err.status).equals(testData['improperRequestInitialsMaximumElementsExceeds400Error']['expected_results']['response_code']);
			done();
		});
	});

	it('improperRequestInvalidStatus400Error', (done) => {
		let results = {};
		const initials = testData['improperRequestInvalidStatus400Error']['params']['initials'];
		const activeStatus = testData['improperRequestInvalidStatus400Error']['params']['activeStatus'];
		const correlationId = testData['improperRequestInvalidStatus400Error']['params']['correlationId'];
		const authToken = "Bearer " + token;

		let response = officersDetailService(authToken, correlationId, initials, activeStatus);
		response.then((data) => {
			results = data;
			expect(results.status).equals(testData['improperRequestInvalidStatus400Error']['expected_results']['response_code']);
			done();
		}).catch(err => {
			expect(err.status).equals(testData['improperRequestInvalidStatus400Error']['expected_results']['response_code']);
			done();
		});
	});

	it('failureInsertOfficerDetails', (done) => {
		let results = {};
		const dataBody = testData['failureInsertOfficerDetails']['officerData'];
		const correlationId = testData['failureInsertOfficerDetails']['correlationId'];
		const authToken = "Bearer " + token;

		let response = upsertOfficersDetailService(authToken, dataBody, correlationId);

		response.then((data) => {
			results = data;
			expect(results.status).equals(testData['failureInsertOfficerDetails']['expected_results']['response_code']);
			done();
		}).catch(err => {
			expect(err.status).equals(testData['failureInsertOfficerDetails']['expected_results']['response_code']);
			done();
		});
	});

	it('failureInsertOfficerDetails_InvalidInitials', (done) => {
		let results = {};
		const dataBody = testData['failureInsertOfficerDetails_InvalidInitials']['officerData'];
		const correlationId = testData['failureInsertOfficerDetails_InvalidInitials']['correlationId'];
		const authToken = "Bearer " + token;

		let response = upsertOfficersDetailService(authToken, dataBody, correlationId);

		response.then((data) => {
			results = data;
			expect(results.status).equals(testData['failureInsertOfficerDetails_InvalidInitials']['expected_results']['response_code']);
			done();
		}).catch(err => {
			expect(err.status).equals(testData['failureInsertOfficerDetails_InvalidInitials']['expected_results']['response_code']);
			done();
		});
	});

	it('failureUpdateOfficerDetails_InvalidActiveStatus', (done) => {
		let results = {};
		const dataBody = testData['failureUpdateOfficerDetails_InvalidActiveStatus']['officerData'];
		const correlationId = testData['failureUpdateOfficerDetails_InvalidActiveStatus']['correlationId'];
		const authToken = "Bearer " + token;

		let response = upsertOfficersDetailService(authToken, dataBody, correlationId);

		response.then((data) => {
			results = data;
			expect(results.status).equals(testData['failureUpdateOfficerDetails_InvalidActiveStatus']['expected_results']['response_code']);
			done();
		}).catch(err => {
			expect(err.status).equals(testData['failureUpdateOfficerDetails_InvalidActiveStatus']['expected_results']['response_code']);
			done();
		});
	});

	it('failureUpdateOfficerDetails', (done) => {
		let results = {};
		const dataBody = testData['failureUpdateOfficerDetails']['officerData'];
		const correlationId = testData['failureUpdateOfficerDetails']['correlationId'];
		const authToken = "Bearer " + token;

		let response = upsertOfficersDetailService(authToken, dataBody, correlationId);

		response.then((data) => {
			results = data;
			expect(results.status).equals(testData['failureUpdateOfficerDetails']['expected_results']['response_code']);
			done();
		}).catch(err => {
			expect(err.status).equals(testData['failureUpdateOfficerDetails']['expected_results']['response_code']);
			done();
		});
	});
});
