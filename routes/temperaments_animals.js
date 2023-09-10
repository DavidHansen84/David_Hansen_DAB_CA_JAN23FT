var express = require('express');
var router = express.Router();
var TempAniService = require("../services/TempAniService");
const db = require('../models'); 
var tempaniService = new TempAniService(db);

(async () => {
    try {
        await tempaniService.populateTempAni();

    } catch (error) {
        console.error('Error populating tables:', error);
    }
})();

router.get('/', async function (req, res, next) {
    const tempani = await speciesService.get();
    let user = req.user
    res.render("tempani", {user: user, tempani: tempani})
})

router.post('/update', async function (req,res,next){
    res.render("index",{user: null})
})

module.exports = router;