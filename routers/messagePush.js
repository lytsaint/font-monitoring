
/**
 * 消息推送
 */

const moment = require('moment');

/**
 * @param edit redis
 */

const editMysql = require('./../module/index');


class messagePush {

    /**
     * 增加message接口
     */

    static async addMessage(ctx, next) {

        let obj = ctx.request.body;

        /**
         * 创建时间
         */

        obj.time = moment().format('YYYY-MM-DD HH:mm:ss');

        new editMysql().messPush(obj);

        ctx.body = {
            success: true,
            msg: '成功'
        };

    }

    /**
     * 获取信心用于前端分页显示
     */

    static async getMessage(ctx, next) {

        await paging(ctx, 'messPush');
        await next();
    }

    /**
     * 设置推送消息
     */
    
    static async setMessage(ctx, next) {

        const { num, id } = ctx.request.body;
        
        let isEnable = {};
        
        if (num == '1') {
        
            isEnable.isEnable = true;
        
        } else if (num == '2') {
        
            isEnable.isEnable = false; // 是否停用
        
        }
        /**
         * 根据num 来区分功能
         * 1、启用
         * 2、停用
         * 3、删除
         * 根据oeder 定位插件的位置
         * 进行插件属性修改以及删除操作
         */

        if (num == '1' || num == '2') {
            
            await new editMysql().updateMessage(id, isEnable);
            
            return ctx.body = {
                success: true,
                msg: '操作成功'
            };
        } else {

            /**
             * 删除数据库字段
             */

            new editMysql().deleteMessageId(id);
            ctx.body = {
                success: true,
                msg: '删除成功'
            };
        }

        await next();

    }
}


/**
 * 分页处理
 */

const paging = async(ctx) => {
    
    let currentPage = ctx.query.page ? ctx.query.page : 1;
    let countPerPage = ctx.query.pageSize ? ctx.query.pageSize : 10;
    
    let data = await new editMysql().messageFindAll(Number(currentPage), Number(countPerPage));
    
    if (data.rows) {
        ctx.body = {
            success: true,
            data: data.rows,
            msg: '成功',
            pageSize: Math.ceil(data.count / Number(countPerPage))
        };
    } else {
        ctx.body = {
            success: false,
            data: {},
            msg: '失败'
        };
    }
    
};
    

module.exports = messagePush;