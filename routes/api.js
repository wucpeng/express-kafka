'use strict';
const express = require('express');
const _ = require('underscore');
const log = require('./hztTool/logUt.js').getLogger();
const ut = require('./hztTool/util.js');
const kafkaProducer = require('./kafkaTool/producer.js');
const kafkaTopic = require('./kafkaTool/kafkaTopic.js');

const app = exports.app = express();
app.use(express.static(__dirname + '/../public'));

app.get('/test/api', (req, res)=> {
    log.debug('test/api');
    ut.testData();
    res.send(200, {msg: "test api success"});
});

app.get('/test/kafka/producer/msg', kafkaProducer.sendTestProducerMsg);
app.post('/test/kafka/producer/msg', kafkaProducer.sendTestProducerMsg);
app.get('/test/kafka/topic/create', kafkaTopic.createTopics);