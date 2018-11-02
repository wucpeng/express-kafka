const dbModal = require('./dbModal.js').dbModal;
const boot = require('../../boot.js');
const db = boot.db;

//const platformDbCollections = [
//    {col: 'user', name: '用户'},
//];
// 基本结构
exports.dbSchool = new dbModal(db, 'school');
exports.dbClass  = new dbModal(db, 'class');
exports.dbUser   = new dbModal(db, 'user');




