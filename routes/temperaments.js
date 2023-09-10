var express = require('express');
var router = express.Router();
var TemperamentService = require("../services/TemperamentService");
const db = require('../models'); 
var temperamentService = new TemperamentService(db);
var { isAdmin } = require("./authMiddlewares");
var AnimalService = require("../services/AnimalService");
var animalService = new AnimalService(db);
var createError = require('http-errors');

(async () => {
    try {
        await temperamentService.populateTemperament();

    } catch (error) {
        console.error('Error populating tables:', error);
    }
})();

router.get('/', async function (req, res, next) {
    const temperament = await temperamentService.get();
    let user = req.user
    res.render("temperament", {user: user , temperament: temperament})
})

router.post('/update', isAdmin, async function (req,res,next){
    TemperamentId = req.body.TemperamentId;
    Name = req.body.Name;
    await temperamentService.Update(TemperamentId, Name);
    res.end();
})

router.delete('/delete', isAdmin, async function (req, res, next){
    const thisTemperamentId = req.body.TemperamentId;

    // Check if there are any animals with this SpeciesId
    const animalsWithTemperament = await animalService.getByTemperamentId(thisTemperamentId);

    if (animalsWithTemperament.length === 0) {
        // No animals found with this SpeciesId, proceed with deletion
        await temperamentService.deleteTemperament(thisTemperamentId);
        res.end();
    } else {
        // There are animals associated with this species, send a response indicating that deletion is not allowed
        next(createError(404));
    }
});

router.post('/add', isAdmin, async function(req, res, next) {    
    let Temperament = "How do I get an input here?"
    await temperamentService.create(Temperament);
    res.end()
  });

module.exports = router;