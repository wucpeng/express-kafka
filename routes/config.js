'use strict';
const fs = require('fs');
const path = require('path');
const _ = require('underscore');
exports.CONFIG = {};

let initEnvConfig = ()=> {
    let evnConfig = null;
    let envConfigFilePath = path.join(__dirname, '../env_config.json');
    let flag = fs.existsSync(envConfigFilePath);
    if (flag) {
        evnConfig = JSON.parse(fs.readFileSync(envConfigFilePath));
    } else {
        evnConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../env_config_default.json')));
    }
    exports.CONFIG = _.extend(exports.CONFIG, evnConfig);
};
initEnvConfig();