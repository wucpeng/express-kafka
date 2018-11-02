'use strict';
const log = require('../hztTool/logUt.js').getLogger();
const kafka = require('kafka-node');
const CONFIG = require('../config.js').CONFIG;
exports.createTopics = (req, res)=> {
    log.debug("createTopics");
    let topic = req.param('topic');
    if (!topic) return res.send(400, {errorCode: 1000, msg: "topic"});
    let producer = new kafka.Producer(new kafka.Client(CONFIG.kafkaZPLink), {requireAcks: 1});
    producer.on('ready', ()=> {
        producer.createTopics([topic], false, (err, data)=> {
            if (err) {
                log.debug("createTopic err", err);
                return res.send(500, {errorCode: 1000});
            }
            log.debug("create success", data);
            res.send(200, {data});
        });
    });
    producer.on('error', (err)=> {
        log.debug("createTopic err1", err);
        return res.send(500, {errorCode: 1000});
    });
};