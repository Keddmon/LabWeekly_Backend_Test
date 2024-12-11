'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        'user',
        /* Properties */
        {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: '',
            },
            id: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: ''
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: ''
            },
            role: {
                type: DataTypes.ENUM('학생', '교수', '관리자'),
                defaultValue: '학생',
                allowNull: true,
                comment: ''
            },
            
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: true,
                comment: ''
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: ''
            }
        },
        /* options */
        {
            tableName: 'user',
            freezeTableName: false,
            underscored: false,
            timestamps: false
        }
    );

    /* Relations */
    user.associate = models => {
        user.hasMany(models.report, {
            sourceKey: 'user_id',
            foreignKey: 'user_id',
        });
    };

    return user;
};
