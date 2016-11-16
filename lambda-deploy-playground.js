const spawn = require('child_process').spawn;

const options = {
	functionName: process.argv[2],
	fileName: `fileb://${process.argv[3]}`,
	role: process.argv[4],
	handler: process.argv[5]
};

console.log(`Running lambda deploy script with these options: ${JSON.stringify(options)}`);

const updateLambdaFn = `aws lambda update-function-code --zip-file ${options.fileName} --function-name ${options.functionName}`;
const createLambdaFn = `aws lambda create-function --runtime nodejs4.3 --function-name ${options.functionName} --zip-file ${options.fileName} --role ${options.role} --handler ${options.handler}`;
const getLambdaFn = `aws lambda get-function --function-name ${options.functionName}`;

let error, result;
 
const cmdGetFunction = spawn('cmd.exe', ['/c', getLambdaFn]);
cmdGetFunction.stdout.on('data', (data) => {
  result = data;
});

cmdGetFunction.stderr.on('data', (data) => {
  error = data;
});

cmdGetFunction.on('close', (code) => {

	let lambdaCommand;

	if(error) {
		console.log(error.toString());
		console.log('Going to create lambda function:', createLambdaFn);
		lambdaCommand = spawn('cmd.exe', ['/c', createLambdaFn ]);
	} else {
		console.log('Going to update lambda function:', updateLambdaFn);
		lambdaCommand = spawn('cmd.exe', ['/c', updateLambdaFn ]);
	}

	lambdaCommand.stdout.on('data', (data) => {
	  console.log(`${data}`);
	});

	lambdaCommand.stderr.on('data', (data) => {
	  console.log(`${data}`);
	});

	cmdGetFunction.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
	});
});