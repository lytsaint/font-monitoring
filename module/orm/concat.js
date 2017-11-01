
/**
 * @param 模型导入
 * @param ps: 定义模型时，我们每个模型定义为了单独的文件，这样就需要通过sequlize.import()方法导入模型
 */

const { sequelize } = require('./index.js');
const fs = require('fs');
const path = require('path');

let db = {};

fs
  .readdirSync(path.join(__dirname,'table'))
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
  .forEach(function(file) {
      var model = sequelize.import(path.join(__dirname,'table', file));
      db[model.name] = model;
  });

for(let modelName in db) {
    if('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
}

/**
 * @param 建立模型关系
 */

module.exports = db;