const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

//View
const viewPath = path.join(__dirname, 'views');
app.set('view engine', 'ejs');
app.set('views', viewPath);

app.use(express.static(path.join(__dirname, 'public')));

//Read account data
const accountData = fs.readFileSync(path.join(__dirname,'json/accounts.json'), {
    encoding: 'UTF8'
});
const accounts = JSON.parse(accountData);

//Read user data
const userData = fs.readFileSync(path.join(__dirname, 'json/users.json'), {
    encoding: 'UTF8'
})
const users  = JSON.parse(userData);


//Index Route
app.get("/", function(req, res) {
    res.render('index', {
        title: 'Account Summary',
        accounts: accounts
    })
})

//Savings Route
app.get("/savings", function(req, res) {
    res.render('account', {
        account: accounts.savings
    })
})

//Checking Route
app.get("/checking", function(req, res) {
    res.render('account', {
        account: accounts.checking
    })
})

//Credit Route
app.get("/credit", function(req, res) {
    res.render('account', {
        account: accounts.credit
    })
})

//Profile Route
app.get('/profile', function(req, res) {
    console.log(users)
    res.render('profile', {
        user: users[0]
    })
})

//Port
app.listen(3000, function() {
    console.log('PS Project Running on port 3000!')
});