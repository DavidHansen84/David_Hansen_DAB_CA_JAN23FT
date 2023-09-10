module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        Id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        FullName: Sequelize.DataTypes.STRING,
        Username: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false            
        },
        Role: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: "Member",
            validate: {
                isIn: {
                    args: [['Admin', 'Member']],
                    msg: "Role must be 'Admin' or 'Member'"
                }
            }
        }
    }, {
        timestamps: false
    });

    User.associate = function(models) {
        User.hasMany(models.Adoption);
    };

    return User;
};
