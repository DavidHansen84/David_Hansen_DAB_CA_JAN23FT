const { sequelize } = require("../models");
const fs = require("fs");

class TempAniService {
    constructor(db) {
        this.client = db.sequelize;
        this.TempAni = db.TempAni;
    }

    async populateTempAni() {
        try {
            const jsonData = fs.readFileSync('./public/json/temperaments_animals.json', 'utf8');
            const queries = JSON.parse(jsonData);

            for (const queryData of queries) {
                await this.client.query(queryData.query); 
                console.log(`Query executed for tempani ID ${queryData.id}`);
            }
        } catch (error) {
            console.error('Error populating TempAni:', error);
        }
    }

    async get() {
        return this.TempAni.findAll({
            where: {
            }
        }).catch( err => {
            return (err)
        })
    }
}

module.exports = TempAniService;
