const { sequelize } = require("../models");
const fs = require("fs");

class SizeService {
    constructor(db) {
        this.client = db.sequelize;
        this.Size = db.Size;
    }

    async populateSize() {
        try {
            const jsonData = fs.readFileSync('./public/json/size.json', 'utf8');
            const queries = JSON.parse(jsonData);

            for (const queryData of queries) {
                await this.client.query(queryData.query); 
                console.log(`Query executed for size ID ${queryData.id}`);
            }
        } catch (error) {
            console.error('Error populating Size:', error);
        }
    }

    async get() {
        return this.Size.findAll({
            where: {
            }
        }).catch( err => {
            return (err)
        })
    }
}

module.exports = SizeService;