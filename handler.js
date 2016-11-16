'use strict';

let envFromInvokedFunctionArn = function(invokedFunctionArn) {
	switch(invokedFunctionArn) {
		case 'arn:aws:lambda:eu-west-1:959013201777:function:mylambda':
			return 'dev';
		default:
			return 'local';
	}
};

module.exports.batchScheduler = (event, context, callback) => {
	process.env.batEnvironment = envFromInvokedFunctionArn(context.invokedFunctionArn);
	let sender = require('./src/lambda');
	context.callbackWaitsForEmptyEventLoop = false;
	sender(function(err, result){
		callback(err, result);
	});
};
