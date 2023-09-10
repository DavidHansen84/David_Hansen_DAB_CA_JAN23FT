module.exports = (sequelize, Sequelize) => {
    const Animal = sequelize.define('Animal', {
        Id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: Sequelize.DataTypes.STRING,
        Birthday: Sequelize.DataTypes.DATEONLY,
        Adopted: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: "False",
            validate: {
                isIn: {
                    args: [['True', 'False']],
                    msg: "Role must be 'True' or 'False'"
                }
            }
        }   
    }, {
        timestamps: false 
    });

    Animal.associate = function(models) {
        Animal.belongsTo(models.Species, { foreignKey: 'SpeciesId' });
        Animal.belongsTo(models.Size, { foreignKey: 'SizeId' });
        Animal.belongsToMany(models.Temperament, { through: 'Temperaments_Animals',  foreignKey: 'AnimalId' });
    };

    return Animal;
};