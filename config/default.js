
module.exports = {

    /**
     * 如果不是哨兵启动的时候
     */
    redis: {
        port: 6379,             // Redis port
        host: '127.0.0.1',   // Redis host
        family: 4,               // 4 (IPv4) or 6 (IPv6)
        password: ''           // password 
    },
    
    /**
     * 哨兵启动
     */

    // host: 'samzhang.com.cn',
    
    /**
     * 关于数据库值存在的时间
     */
    
    t: {
        time : 2 * 60 * 60 * 1000
    },

    /**
     * 由于数据库分组暂时找不到好的方法，想到在配置文件中配置,有过期时间
     */

    keys: {

        /**
         * mset: 用户基本版本信息
         */

        mset: 'front_sam_zhang_mset',

        /**
         * msets: 前端页面报错信息
         */

        msets: 'front_sam_zhang_msets',

        /**
         * errlogs: 接口报错信息
         */

        errlogs: 'front_sam_zhang_errlogs',

        /**
         * errlogs: 接口分页处理
         */

        pageError: 'front_sam_zhang_pageError',
        
        /**
         * 主要浏览器类型存储字段
         */

        browserType: 'front_sam_zhang_browserType'
    },

    /**
     * 不能删除的key
     */
    longTimeKeys: {

        /**
         * 项目存储字段
         */

        plug: 'front_sam_zhang_plug',

        /**
         * 项目-详情-插件存储字段
         */

        plugList: 'front_sam_zhang_plugList',

        /**
         * 获取下载量字段
         */

        plugDownloads: 'front_sam_zhang_plugDownloads',

        /**
         * 消息推送存储字段
         */

        messagePush: 'front_sam_zhang_messagePush'
    },

    /**
     * 延时停止时间，运行服务器定时任务的时候，会用到
     */
    
    stop: {
        time: 1000
    },

    /**
     * corn 定时任务执行
     */

    corn: {
        time: '1 30 10 * * *'
    },

    /**
     * 登录用户控制，暂时选用配置文件
     */

    user: {
        username: 'zhangsam',
        password: 'aa1111'
    },

    /**
     * 增加注册入口
     */
    register: {
        register: 'front_sam_zhang_register'
    }
};

