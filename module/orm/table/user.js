
/**
 * @param 定义一个新Model（模型）
 * @param Model相当于数据库中的表，该对象不能通过构造函数实例化。
 * @param 只能通过sequelize.define()或sequelize.import()方法创建。
 * @param 在这里使用了sequelize.difine()
 * @param 创建一个用户表
 */

module.exports = (sequelize, DataTypes) => { 

    const User = sequelize.define('user', {

        id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey : true, unique : true, comment: '主键' },
        username: { type: DataTypes.STRING },
        nickname: { type: DataTypes.STRING},
        password: {
            type: DataTypes.STRING,
            validate: {

                // 判断密码长度
                isLongEnough (val) {
                    if (val.length < 4) {
                        throw new Error('Please choose a longer password');
                    }
                }
            }
        }
        
    }, {
        
        // 是否需要增加createdAt、updatedAt、deletedAt字段
        'timestamps': true,

        // 将updatedAt字段改个名
        'updatedAt': 'utime',

        // 将deletedAt字段改名
        'deletedAt': 'dtime'
    });
    
    User.associate = (models) => {
        User.hasMany(models.role);
    };
    return User;
};