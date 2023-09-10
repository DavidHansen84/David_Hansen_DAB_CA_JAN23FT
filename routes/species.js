var express = require('express');
var router = express.Router();
var SpeciesService = require("../services/SpeciesService");
const db = require('../models'); 
var speciesService = new SpeciesService(db);
var { isAdmin } = require("./authMiddlewares");
var AnimalService = require("../services/AnimalService");
var animalService = new AnimalService(db);
var createError = require('http-errors');

(async () => {
    try {
        await speciesService.populateSpecies();

    } catch (error) {
        console.error('Error populating tables:', error);
    }
})();

router.get('/', async function (req, res, next) {
    const species = await speciesService.get();
    const user = req.user;
    res.render("species", {user: user, species: species})
})

router.post('/update', isAdmin, async function (req,res,next){
    SpeciesId = req.body.SpeciesId;
    Name = req.body.Name;
    await speciesService.Update(SpeciesId, Name);
    res.end();
})

router.delete('/delete', isAdmin, async function (req, res, next){
    const thisSpeciesId = req.body.SpeciesId;

  // check if animals has SpeciesId
    const animalsWithSpecies = await animalService.getBySpeciesId(thisSpeciesId);

    if (animalsWithSpecies.length === 0) {
        
        await speciesService.DeleteSpecies(thisSpeciesId);
        res.end();
    } else {
        
        next(createError(404));
    }
});

router.post('/add', isAdmin, async function(req, res, next) {    
    let Species = "How do I get an input here?"
    await speciesService.create(Species);
    const species = await speciesService.get();
    const user = req.user;
    res.render("species", {user: user, species: species})
  });

module.exports = router;