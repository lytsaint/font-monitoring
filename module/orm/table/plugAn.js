
/**
 * @param 插件化项目表===> 总表
 */

module.exports = (sequelize, DataTypes) => { 
    
    const PlugAn = sequelize.define('plugAn', {
    
        id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey : true, unique : true, comment: '主键' },
        name: { type: DataTypes.STRING },
        version: { type: DataTypes.STRING }
    }, {
            
            // 是否需要增加createdAt、updatedAt、deletedAt字段
        'timestamps': true,
    
            // 将updatedAt字段改个名
        'updatedAt': 'utime',
    
            // 将deletedAt字段改名
        'deletedAt': 'dtime'
    });
        
        // PlugAn.associate = (models) => {
        //     User.hasMany(models.role);
        // };
    return PlugAn;
};