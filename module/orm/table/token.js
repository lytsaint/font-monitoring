
/**
 * @param 登录态
 * @param  
 */

const { t } = require('../../../config/default');

module.exports = function (sequelize, DataTypes) {
    const Token = sequelize.define('token', {
        id: {
            type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, unique: true
        },
        valid: {
            type: new DataTypes.VIRTUAL(DataTypes.BOOLEAN, ['createdAt']),
            get: function () {
                return this.get('createdAt') > Date.now() - t.time;
            }
        }
    },
        {
   
        // 是否需要增加createdAt、updatedAt、deletedAt字段
            'timestamps': true,

        // 将updatedAt字段改个名
            'updatedAt': 'utime',

        // 将deletedAt字段改名
            'deletedAt': 'dtime',
            indexes: [{
                method: 'HASH',
                fields: ['id']
            }]
            
        });
    
    Token.associate = (models) =>{
            // Using additional options like CASCADE etc for demonstration
            // Can also simply do Task.belongsTo(models.User);
        Token.belongsTo(models.user);
    };
    return Token;
};