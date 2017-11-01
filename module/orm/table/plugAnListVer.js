
/**
 * @param 插件列表详情版本
 */

module.exports = (sequelize, DataTypes) => { 
    
    const PlugAnListInfo = sequelize.define('plugAnListInfo', {
    
        id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey : true, unique : true, comment: '主键' },
        channl: { type: DataTypes.STRING },
        fileSize: { type: DataTypes.STRING },
        isEnable: { type: DataTypes.BOOLEAN },
        name: { type: DataTypes.STRING },
        optionsRadios: { type: DataTypes.INTEGER },
        path: { type: DataTypes.STRING },
        plugName: { type: DataTypes.STRING },
        plugVersion: { type: DataTypes.STRING },
        systemVer: { type: DataTypes.STRING },
        textarea: { type: DataTypes.STRING },
        time: { type: DataTypes.STRING },
        version: { type: DataTypes.STRING }
    }, {
            
            // 是否需要增加createdAt、updatedAt、deletedAt字段
        'timestamps': true,
    
            // 将updatedAt字段改个名
        'updatedAt': 'utime',
    
            // 将deletedAt字段改名
        'deletedAt': 'dtime'
    });
        
    PlugAnListInfo.associate = (models) =>{
        // Using additional options like CASCADE etc for demonstration
        // Can also simply do Task.belongsTo(models.User);
        PlugAnListInfo.belongsTo(models.plugAnList);
    };
    return PlugAnListInfo;
};