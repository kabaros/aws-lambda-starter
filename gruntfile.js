module.exports = function(grunt) {
	var appConfig = {
		buildNumber: 'local'
	};
	grunt.initConfig({
		config: appConfig,
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			dist: ['dist/'],
			tmp: ['tmp/']
		},
		compress: {
			functions: {
				options: {
					mode: 'zip',
					archive: 'dist/lambda.<%= config.buildNumber %>.zip'
				},
				files: [
					{ expand: true, cwd: '', src: '**/*' }
				]
			}
		},
		execute: {
			'deploy-lambda-playground': {
				options: {
					args: [
						'lambda',
						'<%= compress.functions.options.archive %>',
						'arn:aws:iam::067908349701:role/IAMRoleLambdaGeneric',
						'handler.batchScheduler'
					]
				},
				src: ['lambda-deploy-playground.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-execute');

	grunt.registerTask('build', '', function(buildNumber) {
		appConfig.buildNumber = buildNumber || 'local';
		grunt.task.run([
			'clean',
			'compress']);
	});

	grunt.registerTask('deploy-playground', ['execute:deploy-lambda-playground']);
};
