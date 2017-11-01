

/**
 * @param 创建数据表
 * @param 同步模型到数据库中
 */

const models = require('./concat.js');

for (let i in models) {

    models[i].sync().then(function() {
        console.log('Server successed to start');
    }).catch(function(err){
        console.log('Server failed to start due to error: %s', err);
    });
}