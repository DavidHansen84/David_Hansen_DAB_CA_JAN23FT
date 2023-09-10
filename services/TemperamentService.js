const { sequelize } = require("../models");
const fs = require("fs");

class TemperamentService {
    constructor(db) {
        this.client = db.sequelize;
        this.Temperament = db.Temperament;
    }

    async populateTemperament() {
        try {
            const jsonData = fs.readFileSync('./public/json/temperament.json', 'utf8');
            const queries = JSON.parse(jsonData);

            for (const queryData of queries) {
                await this.client.query(queryData.query); 
                console.log(`Query executed for temperament ID ${queryData.id}`);
            }
        } catch (error) {
            console.error('Error populating Temperament:', error);
        }
    }

    async get() {
        return this.Temperament.findAll({
            where: {
            }
        }).catch( err => {
            return (err)
        })
    }

    async Update(TemperamentId, newName) {
        console.log("TEMPERAMENT"+TemperamentId, newName)
            sequelize.query('CALL update_temperament(:Id, :Name)',{ replacements:
            {
            Id: TemperamentId,
            Name: newName
            
            }}).then( result => {
            return result
                }).catch( err => {
                    return (err)
                })
    }

    async deleteTemperament(TemperamentId) {
       
        return this.Temperament.destroy({
            where: {
                Id: TemperamentId,
            }
        }).catch( err => {
            return (err)
        })
    }

    async create(Temperament) {
        return this.Temperament.create(
            {
                Name: Temperament,
            }
        ).catch( err => {
            return (err)
        })
    }
}

module.exports = TemperamentService;