
/**
 * @param 统计插件下载量
 * @param 1、区分渠道下载量
 * @param 2、总下载量
 */

const editMysql = require('./../module/index');

module.exports = async (ctx, channl, homeDir,  next) => {

    /**
     * 检查redis是否存在channl
     */

    if (channl) {
        let name = homeDir.split('/')[homeDir.split('/').length - 3];

        // name = homeDir, sum += 1;

        let a = await new editMysql().getPlugAnListInfoId(name);

        a = !a ? {} : a;

        let b = await new editMysql().getPlugDownId(channl);

        b = !b ? {} : b;

        if (a.id) {
            if (b.name == channl) { 
                new editMysql().updatePlugDownId(b);
            } else {
                new editMysql().plugDown(channl, a.id);
            }
        }
        // await next();
    }
    ctx.body = {
        success: false,
        data: '不知道为啥，请求头字段暂不能为中文'
    };
    
};