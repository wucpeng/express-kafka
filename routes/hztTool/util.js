'use strict';
const _ = require('underscore');
const tools = require('wucpeng-tools');
const log = require('./logUt.js').getLogger();
const holiday = tools.holiday;
const calendar = tools.calendar;
const identificationCheck = tools.identificationCheck;
const passwdCode = tools.passwdCode;
const rsaMd5Sign = tools.rsaMd5Sign;
const zip = tools.zip;
const timeConvert = tools.timeConvert;
const regionCode = tools.regionCode;
const simpleRegion = regionCode.simpleRegion;
const areaJS = tools.areaJS;
const areaConfig = areaJS.areaConfig;


exports.testData = ()=> {
    log.debug('simpleRegion', simpleRegion);
    log.debug('areaConfig', areaConfig);
    let now = new Date();
    log.debug('isHoliday', holiday.isHolidayDate(now));
    log.debug('calendar', calendar.solar2lunarDate(now));
    log.debug('cert', identificationCheck.certificateNoParse('310109201509160514'));
};



