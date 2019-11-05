'use strict';

const fs = require('fs'),
	path = require('path'),
	http = require('http'),
	winston = require('winston');

const app = require('connect')();
const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');
const moment = require('moment');

global.config = require('nextgen-module-config');

let serverPort = 3905;
if (config.has('NodeServer.host.port')) {
	serverPort = config.get('NodeServer.host.port');
}

// Initialize environment variables for the MDM module to use
// Needs to be set for logging purposes: process.env.ENVIRONMENT;
const logLevel = config.has("NodeServer.logger.level") ? config.get("NodeServer.logger.level") : "error";
const env = ((process.env.ENVIRONMENT != null) ? process.env.ENVIRONMENT.toLowerCase() : "");
process.env.SOURCESYSTEM = "digital-service-banker-assignment-test";


// ----------------------------------------------------------------
// Create the logger object
let logger = new winston.Logger({
	transports: [
		// Log to console
		new (winston.transports.Console)({
			name: "console",
			json: true,
			level: "debug",
			timestamp: true
		})
	],
	// Add custom fields
	rewriters: [
		(level, msg, meta) => {
			meta.applicationName = "digital-service-banker-assignment-test";
			meta.applicationVersion = "v1";
			meta.environment = env;
			meta.level = logger.transports.console.level.toUpperCase();
			return meta;
		}
	],
});
// If we are NOT in dev mode, just log to a single line. That way Splunk will keep it in a single log entry.
if (!process.env.NODE_ENV || process.env.NODE_ENV.toString().toLowerCase() != "dev") {
	logger.transports.console['stringify'] = (obj) => JSON.stringify(obj);
}

// Override the default log functions to make them async
logger.detach = (level, msg) => {
	setTimeout(() => {
		logger[level](msg);
	}, 0);
};
global.logger = logger;


// swaggerRouter configuration
const options = {
	swaggerUi: path.join(__dirname, '/swagger.json'),
	controllers: path.join(__dirname, './controllers'),
	useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const spec = fs.readFileSync(path.join(__dirname, 'api/swagger.yaml'), 'utf8');
const swaggerDoc = jsyaml.safeLoad(spec);

const uiOptions = {
	apiDocs: "/bnkrasgnmttesttest/v1/swagger",
	swaggerUi: "/bnkrasgnmttesttest/v1/docs"
};
// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

	// Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
	app.use(middleware.swaggerMetadata());

	// Validate Swagger requests
	app.use(middleware.swaggerValidator({
		skipRequestParamsValidation: true
	}));

	// Route validated requests to appropriate controller
	app.use(middleware.swaggerRouter(options));

	// Serve the Swagger documents and Swagger UI
	app.use(middleware.swaggerUi(uiOptions));

	// Error Handler
	app.use(function (err, req, res, next) {
		console.error("err.stack: ", err.stack);
		res.setHeader("Content-Type", "application/json");
		res.statusCode = err.statusCode;
		res.end(JSON.stringify(err));
	});

	// Test that connection works--this is now put into readyStatus
	// const models = require('./models/index.js');
	// models.sequelize
	// 	.authenticate()
	// 	.then((result) => {
	// 		console.log('Connection to database has been established successfully.');
	// 	})
	// 	.catch(err => {
	// 		console.error('Unable to connect to the database', err);
	// 	});

	// We don't want to actually run the server from unit tests, so use this global variable for now.
	if (!global.skipStartServer) {
		// Start the server
		http.createServer(app).listen(serverPort, function () {
			const logEntry = {
				operationName: "createServer",
				message: "Your server is listening on port " + serverPort + " (http://localhost:" + serverPort + "). Swagger-ui is available on http://localhost:" + serverPort + "/bnkrasgnmttesttest/v1/docs.",
			};
			logger.debug(logEntry);
		});
	}
});
