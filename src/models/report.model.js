'use strict'
module.exports = (sequelize, DataTypes) => {
    const report = sequelize.define(
        'report',
        {
            report_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: '',
            },
            progress: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: '',
            },
            issues: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: '',
            },
            planned: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: '',
            },
            note: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: '',
            },
            status: {
                type: DataTypes.ENUM('대기', '승인', '거절'),
                defaultValue: '대기',
                allowNull: true,
                comment: '',
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: true,
                comment: '',
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: '',
            },
            user_id: {
                type: DataTypes.INTEGER,
                notNull: true,
                comment: '',
            },
        },
        {
            tableName: 'report',
            freezeTableName: false,
            underscored: false,
            timestamps: false
        }
    );

    report.associate = models => {
        report.belongsTo(models.user, {
            foreignKey: 'user_id',
            targetKey: 'user_id',
        });
    };

    return report;
};