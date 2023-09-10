var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var AnimalService = require("../services/AnimalService");
const db = require('../models'); 
var animalService = new AnimalService(db);
var AdoptedService = require("../services/AdoptedService");
var adoptedService = new AdoptedService(db);
var { isMember, isAdmin } = require("./authMiddlewares");

(async () => {
    try {
        await animalService.populateAnimal();
        await adoptedService.populateAdopted();

    } catch (error) {
        console.error('Error populating tables:', error);
    }
})();


router.get('/', async function (req, res, next) {
    const animals = await animalService.get();
    const user = req.user;
    const currentDate = new Date(); // Get the current date

animals.forEach(animal => {
  const birthday = new Date(animal.Birthday); // Convert the birthday to a Date object
  const ageInMilliseconds = currentDate - birthday; // Calculate the age in milliseconds
  const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365); // Convert milliseconds to years
  animal.Age = Math.floor(ageInYears); // Round down to get the whole years
});

    res.render('animals', { animals: animals, user: user });
});

router.post('/adoptions', isMember, jsonParser, async function(req, res, next) {
    const userId = req.user.id;
    let AnimalId = req.body.AnimalId;

    const animal = await animalService.getOneById(AnimalId);
    console.log(animal)
    if (!animal || animal.Adopted === "True") {
        // Animal not found or already adopted
        return res.status(400).send('Animal not available for adoption');
    }

    await adoptedService.adoptAnAnimal(AnimalId, userId);
    res.end()
});

router.delete('/adoptions', isAdmin, jsonParser, async function(req, res, next) {
    let AnimalId = req.body.AnimalId;
    await adoptedService.cancelAdoption(AnimalId);
    res.end()
});

router.get('/popular', async function (req, res, next) {
    const animals = await animalService.get();
    console.log("ANIMALS " + animals)
    const popularAnimals = await animalService.popular(animals);
    console.log("POPULAR" + popularAnimals)
    const user = req.user;
    const currentDate = new Date(); // Get the current date

animals.forEach(popularAnimals => {
  const birthday = new Date(popularAnimals.Birthday); // Convert the birthday to a Date object
  const ageInMilliseconds = currentDate - birthday; // Calculate the age in milliseconds
  const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365); // Convert milliseconds to years
  popularAnimals.Age = Math.floor(ageInYears); // Round down to get the whole years
});

    res.render('animals', { animals: popularAnimals, user: user });
});


router.get('/adopted', async function (req, res, next) {
    const animals = await animalService.get();
    console.log("ANIMALS " + animals)
    const adoptedAnimals = await animalService.allAdopted(animals);
    console.log("ADOPTED" + adoptedAnimals)
    const user = req.user;
    const currentDate = new Date(); // Get the current date

animals.forEach(adoptedAnimals => {
  const birthday = new Date(adoptedAnimals.Birthday); // Convert the birthday to a Date object
  const ageInMilliseconds = currentDate - birthday; // Calculate the age in milliseconds
  const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365); // Convert milliseconds to years
  adoptedAnimals.Age = Math.floor(ageInYears); // Round down to get the whole years
});

    res.render('animals', { animals: adoptedAnimals, user: user });
});

router.get('/age', async function (req, res, next) {
    const animals = await animalService.byAge();
    console.log("ANIMALS " + animals)
   
    const user = req.user;
    const currentDate = new Date(); // Get the current date

animals.forEach(animals => {
  const birthday = new Date(animals.Birthday); // Convert the birthday to a Date object
  const ageInMilliseconds = currentDate - birthday; // Calculate the age in milliseconds
  const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365); // Convert milliseconds to years
  animals.Age = Math.floor(ageInYears); // Round down to get the whole years
});

res.render('animals', { animals: animals, user: user });
});

router.get('/daterange', async function (req, res, next) {
    
    const user = req.user;
    

    res.render('animals', {  user: user });
});

router.post('/', async function (req, res, next) {
    const startDate = req.body.StartDate;
    const endDate = req.body.EndDate;
    await animalService.findInDateRange(startDate, endDate);
    

res.end();
});

router.get('/countBySize', async function (req, res, next) {
    try {
        const counts = await animalService.countBySize();
        res.json(counts);
    } catch (err) {
        console.error('Error counting animals by size:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;

