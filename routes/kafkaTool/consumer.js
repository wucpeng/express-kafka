'use strict';
const Kafka = require("node-rdkafka");
const CONFIG = require('../config.js').CONFIG;
const log = require('../hztTool/logUt.js').getLogger();

const topics = ['test'];
const kafkaConfig = {
    "group.id": "platform_app",
    "metadata.broker.list": CONFIG.kafkaSELink,
    "socket.keepalive.enable": true,
    "debug": "generic,broker,security"
};
//log.info('kafka consumer start');
const consumer = new Kafka.KafkaConsumer(kafkaConfig, {"auto.offset.reset": "beginning"});
let isProcess = false;
consumer.on("error", (err)=> {
    log.debug('err', err);
    isProcess = false;
    //console.debug('err', err);
});

consumer.on("ready", (arg)=> {
    log.debug(`Consumer ${arg.name} ready`);
    //console.debug(`Consumer ${arg.name} ready`);
    consumer.subscribe(topics);
    consumer.consume();
});

const numMessages = 5;
let counter = 0;
consumer.on("data", (m)=> {
    //log.debug('data', m);
    //console.log('data', m);
    counter++;
    if (counter % numMessages === 0) {
        log.debug("calling commit");
        //console.debug("calling commit");
        consumer.commit(m);
    }
    m.value = m.value.toString();
    log.debug('consumer data', m);
    //console.debug('data', m.value.toString());
});

consumer.on("disconnected", (arg)=> {
    log.debug('disconnected', arg);
    isProcess = false;
    //console.debug('disconnected', arg);
    //process.exit();
});

consumer.on('event.error', (err)=> {
    log.debug('event.error', err);
    //console.debug('event.error', err);
    //process.exit(1);
});

consumer.on('event.log', (log)=> {
    //log.debug('event.log', log);
    //console.debug('event.log', log);
});

exports.kafkaConsumer = ()=> {
    if (!isProcess) {
        log.debug('kafkaConsumer connect');
        consumer.connect();
        isProcess = true;
    }
};

exports.kafkaConsumer();


// upstream tunnel {
//     server 127.0.0.1:7689;
// }
// server {
//     listen 80;
//     server_name dev.ninghao.net;
//     location / {
//         proxy_set_header X-Real-IP $remote_addr;
//         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
//         proxy_set_header Host $http_host;
//         proxy_redirect off;
//         proxy_pass http://tunnel;
//     }
// }