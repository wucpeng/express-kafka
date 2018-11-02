/**
 * Created by wucpeng on 17/09/22.
 * @module hzt/tool/dbModal
 */

'use strict';
//const _ = require('underscore');
//const ObjectID = require('mongodb').ObjectID;
//const async = require('async');
const ut = require('../hztTool/logUt.js').getLogger();
class dbModal {
    constructor(db, colName) {
        this.colName = colName;
        this.db = db;
        this.collection = db.collection(colName);
    }

    mFindById(id, options, callback) {
        if (!options) options = {};
        this.collection.findById(id, options, (err, item)=> {
            if (err) { ut.error('db err', err); return callback(err);}
            callback(null, item);
        });
    }

    mFindOne(spec, options, callback) {
        if (!options) options = {};
        this.collection.findOne(spec, options, (err, item)=> {
            if (err) { ut.error('db err', err); return callback(err);}
            callback(null, item);
        });
    }

    mFindItems(spec, options, callback) {
        if (!options) options = {};
        this.collection.findItems(spec, options, (err, items)=> {
            if (err) { ut.error('db err', err); return callback(err);}
            callback(null, items);
        });
    }

    mFindItemsTwo(spec, options, conditions, callback) {
        this.collection.findItems(spec, options, conditions, (err, items)=> {
            if (err) { ut.error('db err', err); return callback(err);}
            callback(null, items);
        });
    }

    mUpdateById(id, updateSpec, callback) {
        this.collection.updateById(id, updateSpec, (err)=> {
            if (err) { ut.error('db err', err); return callback(err);}
            callback(null);
        });
    }

    mUpdateOne(spec, updateSpec, callback) {
        this.collection.update(spec, updateSpec, (err)=> {
            if (err) { ut.error('db err', err); return callback(err);}
            callback(null);
        });
    }

    mUpdateMulti(spec, updateSpec, callback) {
        this.collection.update(spec, updateSpec, {multi: true}, (err)=> {
            if (err) { ut.error('db err', err); return callback(err);}
            callback(null);
        });
    }

    mUpdateUpsert(spec, updateSpec, callback) {
        this.collection.update(spec, updateSpec, {upsert: true}, (err)=> {
            if (err) { ut.error('db err', err); return callback(err);}
            callback(null);
        });
    }

    mInsertItem(doc, callback) {
        this.collection.insert(doc, (err, result)=> {
            if (err) { ut.error('db err', err); return callback(err);}
            callback(null, result.ops);
        });
    }

    mDeleteById(id, callback) {
        this.collection.removeById(id, (err)=> {
            if (err) { ut.error('db err', err); return callback(err);}
            callback(null);
        });
    }

    mDeleteMulti(spec, callback) {
        this.collection.remove(spec, {multi: true}, (err)=> {
            if (err) { ut.error('db err', err); return callback(err);}
            callback(null);
        });
    }

    mCountItems(spec, callback) {
        this.collection.count(spec, (err, count)=> {
            if (err) { ut.error('db err', err); return callback(err);}
            callback(null, count);
        });
    }

    mDistinct(field, spec, callback) {
        this.collection.distinct(field, spec, (err, items)=> {
            if (err) {ut.error('db err', err); return callback(err);}
            callback(err, items);
        });
    }
}

exports.dbModal = dbModal;