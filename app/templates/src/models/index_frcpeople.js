const Sequelize = require('sequelize');

// Strings need to be .trim()'d, because Docker Secrets somehow doesn't handle the encoding correctly.
let database = config.get('NodeServer.PeopleDB.windowsAuth.database').trim();
let username = config.get('NodeServer.PeopleDB.windowsAuth.username').trim();
let password = config.get('NodeServer.PeopleDB.windowsAuth.password').trim();
let host = config.get('NodeServer.PeopleDB.windowsAuth.host').trim();
let domain = config.get('NodeServer.PeopleDB.windowsAuth.domain').trim();

const maxConnections = config.get('NodeServer.PeopleDB.poolConfig.maxConnections');
const minConnections = config.get('NodeServer.PeopleDB.poolConfig.minConnections');
const idleTime = config.get('NodeServer.PeopleDB.poolConfig.idleTime');
const acquireTime = config.get('NodeServer.PeopleDB.poolConfig.acquireTime');
const evictTime = config.get('NodeServer.PeopleDB.poolConfig.evictTime');
const retryMax = config.get('NodeServer.PeopleDB.retryConfig.retryMax');
const retryMatch = config.get('NodeServer.PeopleDB.retryConfig.retryMatch');

//	NOTE: THIS IS THE WORKING CONNECTION w/ WINDOWS AUTH
const sequelize = new Sequelize(database, username, password, {
	host: host,
	port: 1433,
	logging: false,
	dialect: 'mssql',
	dialectOptions: {
		encrypt: false,
		domain: domain,
		trustedConnection: true
	},
	pool: {
		max: maxConnections,
		min: minConnections,
		idle: idleTime,
		acquire: acquireTime,
		evict: evictTime
	},
	retry : {
		match : retryMatch,
		retryMax: retryMax
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
		logger.info('connection to PeopleDB database has been established successfully');
	})
	.catch(err => {
		// console.error('Unable to connect to the database', JSON.stringify(err));
		logger.error('Unable to connect to the PeopleDB database', JSON.stringify(err));
	});

const models_frcpeople = {};

models_frcpeople.sequelize = sequelize;
models_frcpeople.Sequelize = Sequelize;

module.exports = models_frcpeople;
