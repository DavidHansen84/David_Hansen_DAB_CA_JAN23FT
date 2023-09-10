const { sequelize } = require("../models");
const fs = require("fs");

class SpeciesService {
    constructor(db) {
        this.client = db.sequelize;
        this.Species = db.Species;
    }

    async populateSpecies() {
        try {
            const jsonData = fs.readFileSync('./public/json/species.json', 'utf8');
            const queries = JSON.parse(jsonData);

            for (const queryData of queries) {
                await this.client.query(queryData.query); 
                console.log(`Query executed for species ID ${queryData.id}`);
            }
        } catch (error) {
            console.error('Error populating Species:', error);
        }
    }

    async get() {
        return this.Species.findAll({
            where: {
            }
        }).catch( err => {
            return (err)
        })
    }

    async Update(SpeciesId, newName) {
        console.log("SPECIES"+SpeciesId, newName)
            sequelize.query('CALL update_species(:Id, :Name)',{ replacements:
            {
            Id: SpeciesId,
            Name: newName
            
            }}).then( result => {
            return result
                }).catch( err => {
                    return (err)
                })
    }

    async DeleteSpecies(SpeciesId) {
       
        return this.Species.destroy({
            where: {
                Id: SpeciesId,
            }
        }).catch( err => {
            return (err)
        })
    }

    async create(Species) {
        return this.Species.create(
            {
                Name: Species,
            }
        ).catch( err => {
            return (err)
        })
    }

}

module.exports = SpeciesService;
