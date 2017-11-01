

const editMysql = require('./../module/index');

const { keys } = require('./../config/default');

const brower = async (type) => {

    if (!type) {
        return;
    }

    const browerType = require('./../utils/getBrowserType')(type);

    const time = new Date() - 0;
    
    let obj = {};
    
    obj.time = time;

    obj['type'] = browerType;

    new editMysql().sadd(keys.browserType, JSON.stringify(obj));
};

module.exports = brower;