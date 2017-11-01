
/**
 * @param 创建角色表
 * @param admin 
 */

module.exports = function (sequelize, DataTypes) {
    const Role = sequelize.define('role', {
        id: { type: DataTypes.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true, comment:'角色Id' },
        roleName: { type: DataTypes.STRING, field: 'role_name', comment:'角色名' }
    },
        {
            tableName: 'role',   
            
        // 是否需要增加createdAt、updatedAt、deletedAt字段
            'timestamps': true,

        // 将updatedAt字段改个名
            'updatedAt': 'utime',

        // 将deletedAt字段改名
            'deletedAt': 'dtime'
        });
    Role.associate = (models) =>{
            // Using additional options like CASCADE etc for demonstration
            // Can also simply do Task.belongsTo(models.User);
        Role.belongsTo(models.user);
    };
    
    return Role;
};