'use strict';
const models = require('../models');
const frc_models = require('../models/index_frcpeople');

/**
 * Gets the status of the microservice itself.
 * @returns {object} - The liveStatus of the services.
 **/
exports.getLiveStatus = (res) => {
	const logEntry = {
		operationName: "getLiveStatus",
		correlationId: "digital-service-banker-assignment-test-liveStatus"
	};
	return new Promise((resolve, reject) => {
		const liveDate = new Date().toLocaleString();
		const liveStatus = {
			"Live": true,
			"LiveAsOf": liveDate
		};
		// res.setHeader('Content-Type', 'application/json');	NOTE: this line was breaking the code.
		resolve(liveStatus);
		return liveStatus;
	}).catch((err) => {
		const liveStatus = {
			"Live": false,
			"Error": err
		};
		reject(liveStatus);
		return liveStatus;
	});
};

/**
 * Gets the status of the entire given system, including all downstream systems. In this case, it would represent the status of the CUSTDM connection
 *
 * @returns readyStatus
 **/
exports.getReadyStatus = function (res) {
	const logEntry = {
		operationName: "getReadyStatus",
		correlationId: "digital-service-banker-assignment-test-readyStatus"
	};
	return new Promise((resolve, reject) => {

		const startDate = new Date().toLocaleString();

		return models.sequelize
			.authenticate()
			.then(() => {

				let checkForPeopleDBStatus = config.get('NodeServer.checkForPeopleDBStatus');
				console.log('checkForPeopleDBStatus:'+checkForPeopleDBStatus);
				if(checkForPeopleDBStatus){
					return frc_models.sequelize
						.authenticate()
						.then(() => {
							//logger.detach("info", 'ReadyStatus - Connection to database has been established successfully at ' + startDate);
							const readyDate = new Date().toLocaleString();
							const ready = {
								Ready: true,
								ReadyAsOf: readyDate
							};

							resolve(ready);
							return ready;
						})
						.catch(err => {
							logEntry.message = "Caught exception authenticating PeopleDB. Unable to connect to the database at ", startDate;
							logEntry.stackTrace = err;
							//logger.detach("error", logEntry);
							const readyError = {
								Ready: false,
								FailedComponent: "PeopleDB",
								Message: err.name + ": " + err.message,
								status: 401
							};
							reject(readyError);
							return readyError;
						});
				}else{
					const readyDate = new Date().toLocaleString();
					const ready = {
						Ready: true,
						ReadyAsOf: readyDate
					};

					resolve(ready);
					return ready;
				}
			})
			.catch(err => {
				logEntry.message = "Caught exception authenticating DigitalDB. Unable to connect to the database at ", startDate;
				logEntry.stackTrace = err;
				//logger.detach("error", logEntry);
				const readyError = {
					Ready: false,
					FailedComponent: "CustDM",
					Message: err.name + ": " + err.message,
					status: 401
				};
				reject(readyError);
				return readyError;
			});
	});
};
