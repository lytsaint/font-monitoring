
/**
 * @param 接口错误信息
 * @param admin 
 */

 
module.exports = function (sequelize, DataTypes) {
    const NetErrorMessage = sequelize.define('netErrorMessage', {
        id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey : true, unique : true, comment: '主键' },
        method: { type: DataTypes.STRING},
        originalUrl: { type: DataTypes.STRING},
        status: { type: DataTypes.STRING},
        t: { type: DataTypes.STRING},
        time: { type: DataTypes.STRING},
        msg: { type: DataTypes.STRING }
    },
        {

        // 是否需要增加createdAt、updatedAt、deletedAt字段
            'timestamps': true,

        // 将updatedAt字段改个名
            'updatedAt': 'utime',

        // 将deletedAt字段改名
            'deletedAt': 'dtime'
        });
    
    return NetErrorMessage;
};