
/**
 * @param 进行orm实现
 * @param 处理数据库存储
 * @param 所有的数据库操作通过次类来进行
 * @param 对现有的‘表’存储，进行‘规范化’处理
 * @param 根据现有数据库存储结构
 */

const ormModel = require('./orm');

class editMysql {

    constructor(...args) {
        this.args = args;
    }

    /**
     * @param 登录方法操作
     */

    userSet(name, nickname, password) {
        return new ormModel({ 'username': name, 'nickname': nickname, 'password': password }).returnCreat('user');
    }

    /**
     * @param 登录态方法操作
     */

    tokenSet(token, id) {
        new ormModel({ 'id': token, 'userId': id }).creat('token');
    }

    /**
     * @param 查询用户是否存在，单表查询
     */

    selectUser(name) {
        return new ormModel().selectUser('user', name);
    }

    /**
     * @param 1对1数据表查询
     */

    selectToken(token) {
        return new ormModel().selectUserInfo('token', token);
    }

    /**
     * @param 根据token id 查询用户信息
     */
    
    selectTokenIdUser(id) {
        return new ormModel().selectUserInfo('user', id);
    }
    
    /**
     * @param 退出删除登录态方法
     */

    userLayout(token) {
        new ormModel().delete('token', token);
    }

    /**
     * @param 返回浏览器account 
     */

    getBrowerSet(account) {
        return new ormModel().selectAccount('browser', account);
    }

    /**
     * @param browser 用户浏览器信息
     */

    browerSet(data) {
        new ormModel({
            'account': data.account,
            'jfVersion': data.jfVersion,
            'openTime': data.openTime,
            'source': data.source,
            'userAgent': data.userAgent,
            'appName': data.appName,
            'platform': data.platform,
            'appVersion': data.appVersion,
            'domain': data.domain,
            'localUrl': data.localUrl,
            'title': data.title,
            'referrer': data.referrer,
            'lang': data.lang,
            'sh': data.sh,
            'sw': data.sh,
            'cd': data.sh
        }).creat('browser');
    }

    /**
     * @param getErrorMessageSet
     */

    getErrorMessageSet(str) {
        return new ormModel().findAll(str);
    }

    /**
     * @param errorMessage
     */

    errorMessageSet(data) {
        let msg = [];
        let oArr = [];
        if (data.sMsg.length > 244) {
            msg.push(data.sMsg.split('at')[3]);
            msg.push(data.sMsg.split('at')[5]);
        }
        if (data.eObj.length > 244) {
            oArr.push(data.eObj.split('at')[3]);
            oArr.push(data.eObj.split('at')[5]);
        }
        msg = msg.toString();
        oArr = oArr.toString();
        new ormModel({
            'type': data.type,
            'sMsg': msg || data.sMsg,
            'sUrl': data.sUrl,
            'sLine': data.sLine,
            'sColu': data.sColu,
            'eObj': oArr || data.eObj,
            'sTime': data.sTime,
            'browerType': data.browerType
        }).creat('errorMessage');
    }

    /**
     * @param netMessageSet
     */

    netMessageSet(data) {
        new ormModel({
            'method': data.method,
            'originalUrl': data.originalUrl,
            'status': data.status,
            't': data.t,
            'time': data.time,
            'msg': data.msg
        }).creat('netErrorMessage');
    }

    /**
     * @param 分页查看message
     */

    messageFindAll(currentPage, countPerPage) {
        return new ormModel().findAndCountAll('messPush', currentPage, countPerPage);
    }

    /**
     * @param messagePush
     */

    messPush(data) {
        new ormModel({
            channl: data.channl,
            content: data.content,
            isEnable: data.isEnable,
            time: data.time,
            uerTypes: data.uerTypes
        }).creat('messPush');
    }

    /**
     * @param 获取所有安卓插件项目
     */

    getPlugAnAll() {
        return new ormModel().findAll('plugAn');
    }

    /**
     * @param andir 插件项目查询
     */

    getPlugAn(name) {
        return new ormModel().select('plugAn', name);
    }

    /**
     * @param andir 插件项目管理
     */

    plugAnSet(data) {
        return new ormModel({
            name: data.account,
            version: data.version,
            time: data.time
        }).returnCreat('plugAn');
    }

    /**
     * @param andir 插件列表id
     */
    
    getPlugAnListId(name) {
        return new ormModel().selectPlugAnListInfoId('plugAnList', name);
    }

    /**
     * @param 查询所有插件列表
     */

    getPlugFindAndCountAll(id) {
        return new ormModel().plugFindAndCountAll('plugAnList', id);
    }

    /**
     * @param andir 插件列表
     */
    
    plugAnList(data, id) {
        new ormModel({
            plugListName: data.plugName,
            describe: data.describe,
            category: data.category,
            time: data.time,
            plugAnId: id
        }).creat('plugAnList');
    }

    /**
     * @param 删除插件数据
     */
    
    deletePlugAnList(id) {
        return new ormModel().deletePlugAnList('plugAnList', id);
    }

    /**
     * @param andir 插件列表id
     */

    getPlugAnListInfoId(name) {
        return new ormModel().select('plugAnListInfo', name);
    }

    /**
     * @param andir 设置插件列表id
     */

    getPlugAnListInfoIds(name) {
        return new ormModel().selectPlugAnListInfoIds('plugAnListInfo', name);
    }
    
    /**
     * @param 根据插件列表id，查询其所有列表详情插件
     */

    getPlugAnListInfoAll(id) {
        return new ormModel().getPlugAnListInfoIdAll('plugAnListInfo', id);
    }

     /**
     * @param 设置插件版本插件的状态
     */

    updatePlugAnListId(plugName, isEnable) {
        new ormModel().setPlugupdate('plugAnListInfo', plugName, isEnable.isEnable);
    }

    /**
     * @param 设置长连接信息状态
     */

    updateMessage(id, isEnable) {
        new ormModel().setMessageupdate('messPush', id, isEnable.isEnable);
    }

    /**
     * @param 根据id删除插件数据
     */

    deletePlugAnListId(id) {
        new ormModel().delPlugAnListInfo('plugAnListInfo', id);
    }

    /**
     * @param 根据id删除下载量统计
     */

    deletePlugDownId(id) {
        new ormModel().delPlugAnListInfo('plugDown', id);
    }

    /**
     * @param 根据id删除长连接信息
     */

    deleteMessageId(id) {
        new ormModel().delPlugAnListInfo('messPush', id);
    }

    /**
     * @param 根据plugAnId 删除插件数据
     */

    deletePlugAnId(id) {
        new ormModel().deletePlugAnListId('plugAnListInfo', id);
    }

    /**
     * @param andir 插件列表版本
     */
  
    plugAnListInfo(data, id) {
        new ormModel({
            channl: data.channl,
            fileSize: data.fileSize,
            isEnable: data.isEnable,
            name: data.name,
            optionsRadios: data.optionsRadios,
            path: data.path,
            plugName: data.plugName,
            plugVersion: data.plugVersion,
            systemVer: data.systemVer,
            textarea: data.textarea,
            time: data.time,
            version: data.version,
            plugAnListId: id
        }).creat('plugAnListInfo');
    }

    /**
     * @param 下载量累加
     */

    getPlugDownId(name) {
        return new ormModel().select('plugDown', name);
    }

    /**
     * @param 插件下载量统计
     */

    plugDown(data, id) {
        new ormModel({
            name: data,
            sum: 1,
            plugAnListInfoId: id
        }).creat('plugDown');
    }

    /**
     * @param 更新下载量id
     */

    updatePlugDownId(data) {
        new ormModel().update('plugDown', data.sum + 1, data.name);
    }

    /**
     * @param 分页查看
     */

    getFindAllData(str, currentPage, countPerPage, id) {
        if (id) {
            return new ormModel().idFindAndCountAll(str, currentPage, countPerPage, id);
        } else {
            return new ormModel().findAndCountAll(str, currentPage, countPerPage);
        }
    }

    /**
     * @param 插件下载对外地址
     */

    getPlugAnListInfoData(version, channl, systemVer) {
        return new ormModel().plugPlugAnInfo('plugAnListInfo', version, channl, systemVer);
    }
   
}

module.exports = exports = editMysql;