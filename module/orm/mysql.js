
/**
 * @param 今天1024，按道理来说是‘我们’的节日，但是，网络限流了，宝宝心里苦啊。。。
 * @param 写这块的时候，心情不是很阳光，公司居然限流了GitHub。。。
 */    

const Sequelize = require('sequelize');
const config = require('./../../config/mysql');

/**
 * @param 创建数据库实例
 * @param ps: 实在没有心情写下去了。
 */    

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    timezone: '+08:00'
});

/**
 * @param 验证数据库连接
 * @param (｡･∀･)ﾉﾞ嗨
 */    

sequelize
    .authenticate()
        .then(() => {
            console.log('Database connection success.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

module.exports = sequelize;
