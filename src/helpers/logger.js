'use strict';

if(process.env.batEnvironment === 'local'){
	module.exports = console;
} else {

	const graylogConfig = require('../config').awsResources.graylog;
	const graygelf = require('graygelf');
	const log = graygelf({
		host: graylogConfig.host,
		port: graylogConfig.port
	});
	

	log.on('message', message => {
		console.log(message);
	});
	log.on('error', (err) => {
		console.error(err);
	});

	module.exports = log;
}
