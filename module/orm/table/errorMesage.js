
/**
 * @param 错误信息表
 * @param admin 
 */

module.exports = function (sequelize, DataTypes) {
    const ErrorMessage = sequelize.define('errorMessage', {
        id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey : true, unique : true, comment: '主键' },
        type: { type: DataTypes.STRING },
        sMsg: { type: DataTypes.STRING},
        sUrl: { type: DataTypes.STRING},
        sLine: { type: DataTypes.STRING},
        sColu: { type: DataTypes.STRING},
        eObj: { type: DataTypes.STRING},
        sTime: { type: DataTypes.STRING},
        browerType: { type: DataTypes.STRING}
    },
        {

        // 是否需要增加createdAt、updatedAt、deletedAt字段
            'timestamps': true,

        // 将updatedAt字段改个名
            'updatedAt': 'utime',

        // 将deletedAt字段改名
            'deletedAt': 'dtime'
        });
    
    return ErrorMessage;
};