'use strict';
const schedule = require('node-schedule');
const log = require('./logUt.js').getLogger();
const kafkaConsumer = require('../kafkaTool/consumer.js');
//kafkaConsumer.kafkaConsumer();
exports.doSomethingInMasterProcess = ()=> {
    //ut.debug('doSomethingInMasterProcess');
    master5MinuteProcess();
    master5SecondProcess();
};

let initKafkaConsumer = ()=> {
    kafkaConsumer.kafkaConsumer();
    //log.debug('initKafkaConsumer');
};

exports.doSomethingInWorkerProcess = ()=> {
    //ut.debug('doSomethingInWorkerProcess');
};

let master5MinuteProcess = ()=> {
    let rule = new schedule.RecurrenceRule();
    rule.minute = [1,6,11,16,21,26,31,36,41,46,51,56];
    let job = schedule.scheduleJob(rule, ()=> {
        //log.debug('master5MinuteProcess');
    });
    return job;
};

let master5SecondProcess = ()=> {
    let rule = new schedule.RecurrenceRule();
    rule.second = [1,6,11,16,21,26,31,36,41,46,51,56];
    let job = schedule.scheduleJob(rule, ()=> {
        //log.debug('master5SecondProcess');
        initKafkaConsumer();
    });
    return job;
};
