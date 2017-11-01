
/**
 * @param 错误信息表
 * @param admin 
 */
 
module.exports = function (sequelize, DataTypes) {
    const Browser = sequelize.define('browser', {
        id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey : true, unique : true, comment: '主键' },
        account: { type: DataTypes.STRING },
        jfVersion: { type: DataTypes.STRING},
        openTime: { type: DataTypes.STRING},
        source: { type: DataTypes.STRING},
        userAgent: { type: DataTypes.STRING},
        appName: { type: DataTypes.STRING},
        platform: { type: DataTypes.STRING},
        appVersion: { type: DataTypes.STRING },
        domain: { type: DataTypes.STRING },
        localUrl: { type: DataTypes.STRING },
        title: { type: DataTypes.STRING },
        referrer: { type: DataTypes.STRING },
        sh: { type: DataTypes.STRING },
        sw: { type: DataTypes.STRING },
        cd: { type: DataTypes.STRING }
    },
        {

        // 是否需要增加createdAt、updatedAt、deletedAt字段
            'timestamps': true,

        // 将updatedAt字段改个名
            'updatedAt': 'utime',

        // 将deletedAt字段改名
            'deletedAt': 'dtime'
        });
    
    return Browser;
};