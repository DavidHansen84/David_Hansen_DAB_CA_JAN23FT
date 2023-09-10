const { sequelize } = require("../models");
const fs = require("fs");

class UserService {
    constructor(db) {
        this.client = db.sequelize;
        this.User = db.User;
    }

    async populateUser() {
        try {
            const jsonData = fs.readFileSync('./public/json/user.json', 'utf8');
            const queries = JSON.parse(jsonData);

            for (const queryData of queries) {
                await this.client.query(queryData.query); 
                console.log(`Query executed for user ID ${queryData.id}`);
            }
        } catch (error) {
            console.error('Error populating User:', error);
        }
    }

    async create(firstName, lastName, username, password) {
        return this.User.create(
            {
                FullName: firstName +" "+ lastName,
                Username: username,
                Password: password
            }
        ).catch( err => {
            return (err)
        }) 
    }

    async getOneByName(username) {        
        return await this.User.findOne({
            where: {username: username},
            
        }).catch( err => {
            return (err)
        });
    }

    async get() {
        return this.User.findAll({
            where: {
            }
        }).catch( err => {
            return (err)
        })
    }
}

module.exports = UserService;