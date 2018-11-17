'use strict';
const kafka = require('kafka-node');
const CONFIG = require('../config.js').CONFIG;
const log = require('../hztTool/logUt.js').getLogger();

const Producer = kafka.Producer;
const client = new kafka.Client(CONFIG.kafkaZPLink);
const producer = new Producer(client);

log.info('producer connect');
class toKafka {
    static produce(message, topic, cb) {
        //log.info(4, topic, message);
        let payloads = [
            {
                topic: topic,
                partition: 0,
                attributes: 0,
                messages: message
            }
        ];
        producer.on('ready', ()=> {
            log.info('ready');
        });
        producer.send(payloads, (err, data)=>{
            if (err) {
                log.error(`${topic} ${message} error`, err);
                cb(err);
            }
            log.info(`${topic} ${message} success`, data);
            cb(null, data);
        });
    }
}
module.exports = toKafka;
