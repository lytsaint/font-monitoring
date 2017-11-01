// const redis = require('./../server/redis');

const { host } = require('./../config/default');

const os = require('os');

const networkInterfaces = os.networkInterfaces();
const eth0 = (networkInterfaces.eth0 || networkInterfaces.en0).filter(i => i.family === 'IPv4');

/**
 * @param edit redis
 */

const editMysql = require('./../module/index');

class andirApiController {

    /**
     * andir app 获取全部插件
     * version ===> app版本号
     * channl ===> 渠道号
     * systemVer ===> 系统版本号
     */

    static async andirAppPlugin(ctx, next) {

        const { version, channl, systemVer } = ctx.query;

        let data = await new editMysql().getPlugAnListInfoData(version, channl, systemVer);

        if (!data.length) {
            return ctx.body = {
                data: {
                    list: [],
                    code: '300',
                    success: false,
                    msg: '失败'
                }
            };
        }

        let id = data[0].plugAnListId;

        let arr = [];
        let arr1 = [];
        let arr2 = [];
        let d = [];
        let d1 = [];

        for (let i in data) {
            if (data[i].plugAnListId != id) {
                arr.push(data[i]);
            } else {
                arr1.push(data[i]);
            }
        }

        if (arr.length > 1) {   // 在相同的数据下，获取最大值
            d[0] = arr.reduce((pre, cur) => pre.plugVersion > cur.plugVersion ? pre : cur);
        } else {
            d = arr;
        }

        if (arr1.length > 1) { // 在相同的数据下，获取最大值
            d1[0] = arr1.reduce((pre, cur) => pre.plugVersion > cur.plugVersion ? pre : cur);
        } else {
            d1 = arr1;
        }

        arr2 = d.concat(d1);

        // 处理数据
        const dataAr = await objData(arr2);

        if (arr2.length) {
            ctx.body = {
                data: {
                    list: dataAr
                },
                code: '200',
                success: true,
                msg: '成功'
            };
        } else {
            ctx.body = {
                data: {
                    list: []
                },
                code: '300',
                success: false,
                msg: '失败'
            };
        }
        
        await next();

    }
}

const objData = async (arr) => {

    return arr.map(d => {
        
        return {
            version: d.plugVersion,
            name: d.name,
            isEnable: d.isEnable,
            fileSize: d.fileSize ? d.fileSize : '0K',
            appVer: d.version,
            updateType: d.appVer,
            channl: d.channl,
            androidVer: d.systemVer,
            isAll: d.optionsRadios == '0' ? false : true,
            path: d.path ? 'http://' + (host || (eth0[0].address + ':3002')) + d.path + '/' + d.name + '/' + d.plugVersion + '/' + d.plugName : '没有地址'
        };
    });
};

module.exports = andirApiController;

