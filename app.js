'use strict';
const express = require('express');
const _ = require('underscore');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const errorHandler = require('errorhandler');
const log4js = require('log4js');
const CONFIG = require('./routes/config.js').CONFIG;
const logger = require('./routes/hztTool/logUt.js').getLogger();
const multer = require('multer');
const api = require('./routes/api.js');

const app = express();
app.port = CONFIG.port;
app.title = CONFIG.title;

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(log4js.connectLogger(logger, {format:':method :url :status :res[content-length] - :response-time ms :remote-addr'}));
logger.setLevel('DEBUG');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
//app.use(bodyParser({maxFieldsSize: 1 * 1024 * 1024}));
//app.use(multer());
app.use(methodOverride());
app.use('/1', api.app);
app.get('/', (req, res)=> { res.redirect('/1'); });

console.log('Express server mode %s, on node %s', app.settings.env, process.version);
process.on('uncaughtException', (err)=> {
    logger.log('Final Caught Exception: ' + err);
    logger.log(new Date().toLocaleString());
    logger.log(err.stack);
});
module.exports = app;