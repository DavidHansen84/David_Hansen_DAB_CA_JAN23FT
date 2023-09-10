module.exports = (sequelize, Sequelize) => {
    const Temperament = sequelize.define('Temperament', {
        Id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: Sequelize.DataTypes.STRING,
    },{
        timestamps: false
    });

    Temperament.associate = function(models) {
        Temperament.belongsToMany(models.Animal, { through: 'Temperaments_Animals', foreignKey: 'TemperamentId' });
    };
    
    return Temperament;
};
