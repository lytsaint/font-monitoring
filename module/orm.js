
/**
 * @param rom 通过次类对数据库进行操作
 */

// const redis = require('./../server/redis');
const db = require('./orm/concat.js');

class ormModel {

    constructor(...args) {
        this.args = args;
    }

    /**
     * @param 增加数据方法
     */

    returnCreat(str) {
        return db[str].create(...this.args);
    }

    creat(str) {
        db[str].create(...this.args);
    }

    /**
     * @param 查询方法
     */

    select(str, name) {
        return db[str].findOne({ where: { name } });
    }

    /**
     *@param 查询user信息
     */

    selectUser(str, username) {
        return db[str].findOne({ where: { username } });
    }

    /**
     * 
     * @param 1对1查询
     */

    selectUserInfo(str, id) {
        return db[str].findOne({ where: { id } });
    }

    /**
     * @param 查询account
     */

    selectAccount(str, account) {
        return db[str].findOne({ where: { account } });
    }

    /**
     * @param 查询插件列表id
     */

    selectPlugAnListInfoId(str, plugListName) {
        return db[str].findOne({ where: { plugListName } });
    }

    /**
     * @param 查找设置插件列表id
     */

    selectPlugAnListInfoIds(str, plugName) {
        return db[str].findOne({ where: { plugName: { '$like': '%' + plugName} } });
    }

    /**
     * @param 更新插件版本详细信息状态
     */

    setPlugupdate(str, plugName, isEnable) { 
        db[str].update({ isEnable: isEnable }, { where: { plugName: { '$like': '%' + plugName } } });
    }

    /**
     * @param 更新长连接信息状态
     */

    setMessageupdate(str, id, isEnable) { 
        db[str].update({ isEnable: isEnable }, { where: { id } });
    }

    /**
     * @param 删除插件数据
     */

    delPlugAnListInfo(str, id) { 
        db[str].destroy({ where: { id: id } });
    }

    /**
     * @param 更新插件下载量
     */

    update(str, sum, name) { 
        db[str].update({ sum: sum }, { where: { name } });
    }
    
    /**
     * @param 删除数据方法
     */

    delete(str, token) {
        db[str].destroy({ where: { id: token } });
    }

    /**
     * @param 根据name删除插件列表
     */

    deletePlugAnList(str, id) {
        db[str].destroy({ where: { id: id } });
    }

    /**
     * @param 根据plugAnListId删除插件列表
     */

    deletePlugAnListId(str, id) {
        db[str].destroy({ where: { plugAnListId: id } });
    }

    /**
     * @param 查看分页数据
     */

    findAndCountAll(str, currentPage, countPerPage) {
        return db[str].findAndCountAll({'limit': countPerPage, 'offset': countPerPage * (currentPage - 1) });
    }

    /**
     * @param 根据id分页数据
     */

    idFindAndCountAll(str, currentPage, countPerPage, id) {
        return db[str].findAndCountAll({where: { plugAnListId: id }, 'limit': countPerPage, 'offset': countPerPage * (currentPage - 1) });
    }

    /**
     * @param 查看所有数据
     */

    findAll(str) {
        return db[str].findAll();
    }
    
    /**
     * @param 联合查询插件版本
     */

    plugFindAndCountAll(str, plugAnId) {
        return db[str].findAll({ where: { plugAnId } });
    }

    /**
     * @param 查询插件版本详细信息
     */
    getPlugAnListInfoIdAll(str, plugAnListId) {
        return db[str].findAll({ where: { plugAnListId } });
    }

    /**
     * @param 插件对外下载接口
     */

    plugPlugAnInfo(str, version, channl, systemVer) {
        return db[str].findAll({ where: { channl, version, systemVer } });
    }
    
}

module.exports = ormModel;

