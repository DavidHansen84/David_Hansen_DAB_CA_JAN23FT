var express = require('express');
var router = express.Router();
var UserService = require("../services/UserService");
const db = require('../models'); 
var userService = new UserService(db);

(async () => {
    try {
        await userService.populateUser();

    } catch (error) {
        console.error('Error populating tables:', error);
    }
})();

router.get('/', async function (req, res, next) {
    const user = await userService.get();
    res.render("index", {user: user})
})

router.post('/update', async function (req,res,next){
    res.render("index",{user: null})
})

module.exports = router;