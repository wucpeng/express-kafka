'use strict';
const log = require('../hztTool/logUt.js').getLogger();
const toKafka = require('./toKafka.js');

exports.createProduceMsg = (msgData, topic, callback)=> {
    //log.debug('createProduceMsg', msgData, topic);
    toKafka.produce(msgData, topic, callback);
};

exports.sendTestProducerMsg = (req, res)=> {
    //log.debug("sendTestProducerMsg");
    try {
        let msg = req.param('msg');
        let topic = req.param('topic');
        exports.createProduceMsg([msg], topic, (err, data)=> {
            if (err) return res.send(500, {errorCode: 1000});
            //log.debug("sendTestTopic msg", data);
            res.send(200, {msg: msg, data: data});
        });
    } catch (e) {
        log.debug('db', e);
        res.send(500, {errorCode: 1000});
    }
};



