const http = require('http');
const app = require('./app');
const config = require('./config/config.js');
const log = require('./logging');

const port = config.app.port;
//comment

const server = http.createServer(app);

server.listen(port);
log.info(`Did resolver API server started on: ${port}`);

// TODO add next line in log file
console.log(`Did resolver API server started on: ${port}`);