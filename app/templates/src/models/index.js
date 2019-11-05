const Sequelize = require('sequelize');

// Strings need to be .trim()'d, because Docker Secrets somehow doesn't handle the encoding correctly.
let database = config.get('NodeServer.DigitalWebDB.windowsAuth.database').trim();
let username = config.get('NodeServer.DigitalWebDB.windowsAuth.username').trim();
let password = config.get('NodeServer.DigitalWebDB.windowsAuth.password').trim();
let host = config.get('NodeServer.DigitalWebDB.windowsAuth.host').trim();
let domain = config.get('NodeServer.DigitalWebDB.windowsAuth.domain').trim();

//	NOTE: THIS IS THE WORKING CONNECTION w/ WINDOWS AUTH
const sequelize = new Sequelize(database, username, password, {
	host: host,
	port: 1433,
	logging: false,
	dialect: 'mssql',
	dialectOptions: {
		encrypt: true,
		domain: domain,
		multipleStatements: true
	}
});
//
// const sequelize = new Sequelize(database, username, password, {
// 	host: host,
// 	port: 1433,
// 	logging: false,
// 	dialect: 'mssql'
// });

sequelize
	.authenticate()
	.then((result) => {
		// console.log('Connection to database has been established successfully.');
		logger.info('connection to database has been established successfully');
	})
	.catch(err => {
		// console.error('Unable to connect to the database', JSON.stringify(err));
		logger.error('Unable to connect to the database', JSON.stringify(err));
	});

const models = {};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
