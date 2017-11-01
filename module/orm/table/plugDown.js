
/**
 * @param 创建角色表
 * @param admin 
 */

module.exports = function (sequelize, DataTypes) {
    const PlugDown = sequelize.define('plugDown', {
        id: { type: DataTypes.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true },
        name: { type: DataTypes.STRING},
        sum: { type: DataTypes.INTEGER }
    },
        {

        // 是否需要增加createdAt、updatedAt、deletedAt字段
            'timestamps': true,

        // 将updatedAt字段改个名
            'updatedAt': 'utime',

        // 将deletedAt字段改名
            'deletedAt': 'dtime'
        });
    
    
    PlugDown.associate = (models) =>{
        // Using additional options like CASCADE etc for demonstration
        // Can also simply do Task.belongsTo(models.User);
        PlugDown.belongsTo(models.plugAnListInfo);
    };

    return PlugDown;
};