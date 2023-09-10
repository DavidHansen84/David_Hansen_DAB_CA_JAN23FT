var express = require('express');
var router = express.Router();
const db = require('../models'); 
var AdoptedService = require("../services/AdoptedService");
var adoptedService = new AdoptedService(db);

(async () => {
    try {
                await adoptedService.populateAdopted();

    } catch (error) {
        console.error('Error populating tables:', error);
    }
})();

router.get('/', async function (req, res, next) {
    const Adopted = await adoptedService.get();
    const user = req.user;
    console.log('User:', user);
    res.render('adoptions', { Adopted: Adopted, user: user });
});


module.exports = router;

