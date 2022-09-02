const express = require('express');
const router = express.Router();
const { accounts } = require("../data.js");

//Savings Route
router.get("/savings", function(req, res) {
    res.render('account', {
        account: accounts.savings
    })
})

//Checking Route
router.get("/checking", function(req, res) {
    res.render('account', {
        account: accounts.checking
    })
})

//Credit Route
router.get("/credit", function(req, res) {
    res.render('account', {
        account: accounts.credit
    })
})

module.exports = router;