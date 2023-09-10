module.exports = (sequelize, Sequelize) => {
    const Temperaments_Animals = sequelize.define('Temperaments_Animals', {
        Id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        timestamps: false 
    });

    return Temperaments_Animals;
};