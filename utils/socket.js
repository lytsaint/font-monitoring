
/**
 * socketIo控制
 */

// const redis = require('./../server/redis');

const { longTimeKeys } = require('./../config/default');

/**
 * 定时任务执行
 */

// const cronJob = require('cron').CronJob;

/**
 * @param edit redis
 */

const editMysql = require('./../module/index');


/**
 * 1、全部用户
 * 2、部分用户
 * 3、独立用户
 */

module.exports = function (server) {

    var io = require('socket.io').listen(server);

    io.on('connection', async (socket) => {
        
        socket.on('ferret', async (name, fn) => {
            let obj = {};
            let data = await new editMysql().lrange(longTimeKeys.messagePush, name, name);
            data = JSON.parse(data);
            if (data.isEnable == 'true') {
                obj = {
                    success: true,
                    msg: '成功',
                    data: {
                        uerTypes: data.uerTypes,
                        channl: data.channl,
                        content: data.content
                    }
                };
            } else {
                obj = {
                    success: false,
                    msg: '成功',
                    data: {}
                };
            }

            fn(obj);

        });

        /**
         * 多个消息同时推送不建议用
         */

        // socket.on('realtime', async (name, fn) => {
            
        //     let data = await new editMysql().lrange(longTimeKeys.messagePush, 0, -1);
        //     let d = data.map(JSON.parse);
        //     let e = d.filter(e => Boolean(Number(e.timeSwitch)) && e.isEnable == 'true');

        //     let f = e.map(a => {
        //         return {
        //             data: {
        //                 uerTypes: a.uerTypes,
        //                 channl: a.channl,
        //                 content: a.content
        //             }
        //         };
        //     });

        //     let o = {};

        //     if (f) {
        //         o = {
        //             success: true,
        //             msg: '成功',
        //             data: f
        //         };
        //     } else {
        //         o = {
        //             success: false,
        //             msg: '成功',
        //             data: {}
        //         };
        //     }
        //     fn(o);
        // });
        socket.on('disconnect', function () {
            console.log('user disconnet');
        });
    });
};