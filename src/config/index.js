'use strict';
let environment = process.env.NODE_ENV || 'local';
let configFile = `./config-${environment}`;

console.log('Using config file', configFile);

module.exports = require(`./config-${environment}`);
