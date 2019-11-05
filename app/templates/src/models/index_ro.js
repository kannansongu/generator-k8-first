const Sequelize = require('sequelize');

// Strings need to be .trim()'d, because Docker Secrets somehow doesn't handle the encoding correctly.
let database = config.get('NodeServer.DigitalWebDB_RO.windowsAuth.database').trim();
let username = config.get('NodeServer.DigitalWebDB_RO.windowsAuth.username').trim();
let password = config.get('NodeServer.DigitalWebDB_RO.windowsAuth.password').trim();
let host = config.get('NodeServer.DigitalWebDB_RO.windowsAuth.host').trim();
let domain = config.get('NodeServer.DigitalWebDB_RO.windowsAuth.domain').trim();

const maxConnections = config.get('NodeServer.DigitalWebDB_RO.poolConfig.maxConnections');
const minConnections = config.get('NodeServer.DigitalWebDB_RO.poolConfig.minConnections');
const idleTime = config.get('NodeServer.DigitalWebDB_RO.poolConfig.idleTime');
const acquireTime = config.get('NodeServer.DigitalWebDB_RO.poolConfig.acquireTime');
const evictTime = config.get('NodeServer.DigitalWebDB_RO.poolConfig.evictTime');
const retryMax = config.get('NodeServer.DigitalWebDB_RO.retryConfig.retryMax');
const retryMatch = config.get('NodeServer.DigitalWebDB_RO.retryConfig.retryMatch');

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
		logger.info('connection to RO database has been established successfully');
	})
	.catch(err => {
		// console.error('Unable to connect to the database', JSON.stringify(err));
		logger.error('Unable to connect to the RO database', JSON.stringify(err));
	});

const models_ro = {};

models_ro.sequelize = sequelize;
models_ro.Sequelize = Sequelize;

module.exports = models_ro;
