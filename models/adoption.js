module.exports = (sequelize, Sequelize) => {
    const Adoption = sequelize.define('Adoption', {
        Id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },{
        timestamps: false
    });

    Adoption.associate = function(models) {
        Adoption.belongsTo(models.Animal, { foreignKey: 'AnimalId' });
        Adoption.belongsTo(models.User, { foreignKey: 'UserId' });
    };
    
    return Adoption;
};
