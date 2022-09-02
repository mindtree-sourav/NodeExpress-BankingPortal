const fs = require('fs');
const path = require('path');
const { accounts, users, writeJSON } = require('./data.js');

const express = require('express');
const app = express();

const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services.js');

//View
const viewPath = path.join(__dirname, 'views');
app.set('view engine', 'ejs');
app.set('views', viewPath);

app.use(express.static(path.join(__dirname, 'public')));

//Middleware
app.use(express.urlencoded({extended:true}));

//Index Route
app.get("/", function(req, res) {
    res.render('index', {
        title: 'Account Summary',
        accounts: accounts
    })
})

//Profile Route
app.get('/profile', function(req, res) {
    res.render('profile', {
        user: users[0]
    })
})

app.use('/account', accountRoutes)
app.use('/services', servicesRoutes)

//Port
app.listen(3000, function() {
    console.log('PS Project Running on port 3000!')
});