'use strict';
const log4js = require('log4js');
const fs = require('fs');
const LOG_DIR = "log4js";
let flag = fs.existsSync(LOG_DIR);
if (!flag) fs.mkdirSync(LOG_DIR);
log4js.configure({
    appenders: [
        { type: 'console', category: "console"},
        {
            type: 'dateFile',
            filename: LOG_DIR + '/log.log',
            pattern: "_yyyy-MM-dd",
            alwaysIncludePattern: true,
            category: 'normal'
        }
    ]}
);
let logger = log4js.getLogger('normal');
exports.getLogger = ()=> {return logger;};
exports.log = logger;