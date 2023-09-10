const { sequelize, db } = require("../models");
const fs = require("fs");

class AdoptedService {
    constructor(db) {
        this.client = db.sequelize;
        this.Adoption = db.Adoption;
        this.User = db.User;
        this.Animal = db.Animal;
    }

    async populateAdopted() {
        try {
            const jsonData = fs.readFileSync('./public/json/adoption.json', 'utf8');
            const queries = JSON.parse(jsonData);

            for (const queryData of queries) {
                await this.client.query(queryData.query); 
                console.log(`Query executed for Adopted ID ${queryData.id}`);
            }
        } catch (error) {
            console.error('Error populating Adopted:', error);
        }
    }

    async get() {
        return this.Adoption.findAll({
            where: {
            }
        }).catch( err => {
            return (err)
        })
    }

    async adoptAnAnimal(animalId, userId)  {
        sequelize.query('CALL insert_adoption( :AnimalId, :UserId )',{ replacements:
        {
        AnimalId: animalId,
        UserId: userId
        }}).then( result => {
        return result
            }).catch( err => {
                return (err)
            })
    }

    async cancelAdoption(animalId) {
       
        return this.Adoption.destroy({
            where: {
                AnimalId: animalId,
            }
        }).catch( err => {
            return (err)
        })
    }
}

module.exports = AdoptedService;