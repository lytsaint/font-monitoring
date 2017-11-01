
/**
 * @param 插件列表
 */

module.exports = (sequelize, DataTypes) => { 
    
    const PlugAnListPlugAn = sequelize.define('plugAnList', {
    
        id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey : true, unique : true, comment: '主键' },
        plugListName: { type: DataTypes.STRING },
        describe: { type: DataTypes.STRING },
        category: { type: DataTypes.STRING },
        time: { type: DataTypes.STRING }
    }, {
            
            // 是否需要增加createdAt、updatedAt、deletedAt字段
        'timestamps': true,
    
            // 将updatedAt字段改个名
        'updatedAt': 'utime',
    
            // 将deletedAt字段改名
        'deletedAt': 'dtime'
    });
        
    PlugAnListPlugAn.associate = (models) =>{
        // Using additional options like CASCADE etc for demonstration
        // Can also simply do Task.belongsTo(models.User);
        PlugAnListPlugAn.belongsTo(models.plugAn);
    };
    return PlugAnListPlugAn;
};