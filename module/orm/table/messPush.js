
/**
 * @param 接口错误信息
 * @param admin 
 */

 
module.exports = function (sequelize, DataTypes) {
    const MessPush = sequelize.define('messPush', {
        id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey : true, unique : true, comment: '主键' },
        channl: { type: DataTypes.STRING},
        content: { type: DataTypes.STRING},
        isEnable: { type: DataTypes.BOOLEAN},
        time: { type: DataTypes.STRING},
        uerTypes: { type: DataTypes.STRING}
    },
        {

        // 是否需要增加createdAt、updatedAt、deletedAt字段
            'timestamps': true,

        // 将updatedAt字段改个名
            'updatedAt': 'utime',

        // 将deletedAt字段改名
            'deletedAt': 'dtime'
        });
    
    return MessPush;
};