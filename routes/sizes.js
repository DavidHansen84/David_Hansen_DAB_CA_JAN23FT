var express = require('express');
var router = express.Router();
var SizeService = require("../services/SizeService");
const db = require('../models'); 
var sizeService = new SizeService(db);

(async () => {
    try {
        await sizeService.populateSize();

    } catch (error) {
        console.error('Error populating tables:', error);
    }
})();

router.get('/', async function (req, res, next) {
    const size = await sizeService.get();
    const user = req.user;
    res.render("sizes", {user: user, size: size})
})

router.post('/update', async function (req,res,next){
    res.render("index",{user: null})
})

module.exports = router;