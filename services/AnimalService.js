const { sequelize } = require("../models");
const fs = require("fs");
const { Op } = require("sequelize");

class AnimalService {
    constructor(db) {
        this.client = db.sequelize;
        this.Animal = db.Animal;
        this.Size = db.Size;
        this.Temperament = db.Temperament;
        this.Species = db.Species;
        this.Temperaments_Animals = db.Temperaments_Animals;
    }

    async populateAnimal() {
        try {
            const jsonData = fs.readFileSync('./public/json/animals.json', 'utf8'); 
            const queries = JSON.parse(jsonData);

            for (const queryData of queries) {
                await this.client.query(queryData.query); 
                console.log(`Query executed for animal ID ${queryData.id}`);
            }
        } catch (error) {
            console.error('Error populating Animals:', error);
        }
    }

    async get() {
        try {
            const animals = await this.Animal.findAll({
                include: [
                    {
                        model: this.Size,
                        attributes: ['Name'] 
                    }, 
                    {
                        model: this.Temperament,
                        attributes: ['Name']
                    }, 
                    {
                        model: this.Species,
                        attributes: ['Name']
                    }
                ]
            });
    
            return animals.map(animal => {
                const animalData = animal.get();
                const size = animalData.Size.Name;
                const temperaments = animalData.Temperaments.map(temp => temp.Name).join(', ');
                const species = animalData.Species.Name;
    
                return {
                    ...animalData,
                    Size: size,
                    Temperament: temperaments,
                    Species: species
                };
            });
        } catch (err) {
            console.error('Error fetching animals:', err);
            throw err; 
        }
    }
    
    async getOneById(AnimalId) {        
        return await this.Animal.findOne({
            where: {Id: AnimalId}
        }).catch( err => {
            return (err)
        });
    }

    async getBySpeciesId(speciesId) {
        try {
            const animals = await this.Animal.findAll({
                where: {
                    SpeciesId: speciesId
                }
            });

            return animals;
        } catch (error) {
            console.error('Error fetching animals by speciesId:', error);
            return [];
        }
    }
    async getByTemperamentId(temperamentId) {
        try {
            const animals = await this.Temperaments_Animals.findAll({
                where: {
                    TemperamentId: temperamentId
                }
            });

            return animals;
        } catch (error) {
            console.error('Error fetching animals by temperamentid:', error);
            return [];
        }
    }

    async popular(animals) {
        // Create a map to store the count of each animal
        const animalCountMap = new Map();
    
        // Count how many times each animal appears
        animals.forEach(animal => {
            const name = animal.Name;
            if (animalCountMap.has(name)) {
                animalCountMap.set(name, animalCountMap.get(name) + 1);
            } else {
                animalCountMap.set(name, 1);
            }
        });
    
        // Sort the animals based on the count in descending order
        const sortedAnimals = animals.sort((a, b) => {
            const countA = animalCountMap.get(a.Name);
            const countB = animalCountMap.get(b.Name);
            return countB - countA;
        });
    
        return sortedAnimals;
    }

    async allAdopted(animals) {
        const adoptedAnimals = animals.filter(animal => animal.Adopted === "True");
        return adoptedAnimals;
    }


    
    async byAge() {
        try {
            const sortedAnimals = await this.Animal.findAll({
                order: [
                    ['Birthday', 'DESC'] // Sort by age in descending order
                ],
                include: [
                    {
                        model: this.Size,
                        attributes: ['Name'] 
                    }, 
                    {
                        model: this.Temperament,
                        attributes: ['Name']
                    }, 
                    {
                        model: this.Species,
                        attributes: ['Name']
                    }
                ]
            });
    
            return sortedAnimals.map(animal => {
                const animalData = animal.get();
                const size = animalData.Size.Name;
                const temperaments = animalData.Temperaments.map(temp => temp.Name).join(', ');
                const species = animalData.Species.Name;
    
                return {
                    ...animalData,
                    Size: size,
                    Temperament: temperaments,
                    Species: species
                };
            });
        } catch (err) {
            console.error('Error fetching animals by age:', err);
            throw err; 
        }
    }

    async findInDateRange(startDate, endDate) {
        console.log("STARTDATE "+ startDate);
        console.log("ENDDATE "+ endDate);
        try {
            const animalsInDateRange = await this.Animal.findAll({
                where: {
                    Birthday: {
                        [Op.between]: [startDate, endDate]
                    }
                },
                include: [
                    {
                        model: this.Size,
                        attributes: ['Name'] 
                    }, 
                    {
                        model: this.Temperament,
                        attributes: ['Name']
                    }, 
                    {
                        model: this.Species,
                        attributes: ['Name']
                    }
                ]
            });
    
            return animalsInDateRange.map(animal => {
                const animalData = animal.get();
                const size = animalData.Size.Name;
                const temperaments = animalData.Temperaments.map(temp => temp.Name).join(', ');
                const species = animalData.Species.Name;
    
                return {
                    ...animalData,
                    Size: size,
                    Temperament: temperaments,
                    Species: species
                };
            });
        } catch (err) {
            console.error('Error fetching animals by date range:', err);
            throw err; 
        }
    }
    
    async countBySize() {
        try {
            const counts = await this.Animal.findAll({
                attributes: ['SizeId', [sequelize.fn('COUNT', sequelize.col('SizeId')), 'count']],
                group: ['SizeId']
            });
    
            const sizeCounts = {};
            for (const count of counts) {
                const sizeId = count.get('SizeId');
                const sizeName = await this.Size.findOne({ where: { Id: sizeId } }).then(size => size.Name);
                const animalCount = count.get('count');
    
                sizeCounts[sizeName] = animalCount;
            }
    
            return sizeCounts;
        } catch (err) {
            console.error('Error counting animals by size:', err);
            throw err;
        }
    }
    
    

}
module.exports = AnimalService;
