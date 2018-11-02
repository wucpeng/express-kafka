'use strict';
const config = require('./routes/config.js').CONFIG;
const mongoSkin = require('mongoskin');
const db = mongoSkin.db(config.dbLink);
const log = require('./routes/hztTool/logUt.js').getLogger();
/** mongodb connection */
exports.db = db;
log.debug('mongodb connection', db, config);



