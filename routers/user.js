
const crypt = require('./../ctypto/ctypto').crypt;
const moment = require('moment');

/**
 * @param 用户信息操作
 * 2017-10-28
 * 在写代码的时候，突然发现登录逻辑不对，于是出现了下列操作：
 * del,del,del,del.
 * 第四次重写。
 * 用户信息：
 * 1、注册的时候，存入user表，返回userid，生成token，存入token表，对应存入token外键  userid .
 * 2、登录的时候，根据username查询user表的相对应的userid，同时生成token，存入token表，对应存入token外键  userid。
 * 同时：登录逻辑，token逻辑完毕。
 * 写这里很郁闷，突然醍醐灌顶。。。
 * 遗留一个问题：数据库中 token字段到期后没有自动删除。。缺少一个事务。
 * 
 */

const editMysql = require('./../module/index');

class ApiUser {

    // 用户注册

    static async register(ctx) {

        let d = ctx.request.body;

        if (!d) {
            ctx.body  = {
                msg: '失败',
                success: false,
                data: {}
            };
        }

        const token = crypt.creatToken(d);

        const data = await new editMysql().userSet(d.username, d.nickname, d.password);

        new editMysql().tokenSet(token, data.id);

        ctx.cookies.set('token', token);

        ctx.body  = {
            msg: '成功',
            success: true
        };
    }

    // 用户登录
    static async login(ctx) {

        const d = ctx.request.body;

        let isRegist = await isRegister(ctx);

        if (isRegist) {

            if (isRegist.username == d.username && isRegist.password == d.password) {

                const tdata = crypt.creatToken(d);

                new editMysql().tokenSet(tdata, isRegist.id);

                ctx.cookies.set('token', tdata);

                ctx.body = {
                    msg: '成功',
                    success: true
                };
            } else {
                ctx.body  = {
                    msg: '账号密码错误！！！',
                    success: false
                };
            }    

        } else {
            ctx.body  = {
                msg: '账号密码错误！！！',
                success: false
            };
        }
    }

    // 用户退出
    static async layOut(ctx) {

        const token = ctx.cookies.get('token');
        if (!token) {
            ctx.body  = {
                msg: '退出成功',
                success: true
            };
        }
        new editMysql().userLayout(token);

        ctx.cookies.set('token', '');

        ctx.body  = {
            msg: '退出成功',
            success: true
        };
    }

    // 获取个人信心接口，只针对注册用户，除配置用户以外

    static async userInfo(ctx, next) {
        const token = ctx.cookies.get('token');

        if (token) {

            const a = await new editMysql().selectToken(token);
            const b = await new editMysql().selectTokenIdUser(a.userId);

            const time = b.createdAt;

            if (b) {
                ctx.body  = {
                    success: true,
                    msg: '成功',
                    data: {
                        username: b.username,
                        nickname: b.nickname,
                        time: moment(time).format('YYYY-MM-DD HH:mm:ss')
                    }
                };
            } else {
                ctx.body  = {
                    success: false,
                    msg: '失败'
                };
            }
        } else {
            ctx.body  = {
                success: false,
                msg: '请登录'
            };
        }

        await next();
    }
}

//判断是否注册的用户
const isRegister = async(ctx) => {

    let s = false;

    const data = ctx.request.body;

    const d = await new editMysql().selectUser(data.username);

    if (d) {
        return d;
    }

    return s;
};

module.exports = ApiUser;