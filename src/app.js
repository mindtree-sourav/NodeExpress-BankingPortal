const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

//View
const viewPath = path.join(__dirname, 'views');
app.set('view engine', 'ejs');
app.set('views', viewPath);

app.use(express.static(path.join(__dirname, 'public')));

//Middleware
app.use(express.urlencoded({extended:true}));

//Read account data
const accountData = fs.readFileSync(path.join(__dirname,'json/accounts.json'), {
    encoding: 'utf8'
});
const accounts = JSON.parse(accountData);

//Read user data
const userData = fs.readFileSync(path.join(__dirname, 'json/users.json'), {
    encoding: 'utf8'
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
    res.render('profile', {
        user: users[0]
    })
})

//Transfer Route
app.get('/transfer', function(req, res) {
    res.render('transfer');
})

app.post('/transfer', function(req, res) {
    accounts[req.body.from].balance -= req.body.amount;
    accounts[req.body.to].balance += parseInt(req.body.amount, 10);
    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, 'json','accounts.json'), accountsJSON, 'utf8');
    res.render('transfer', {message: 'Transfer Completed'});
});

//Payment Route
app.get('/payment', (req, res)=> {
    res.render('payment', { account: accounts.credit })
})

app.post('/payment', (req, res) => {
    accounts.credit.balance -= req.body.amount;
    accounts.credit.available += parseInt(req.body.amount);
    const accountsJSON = JSON.stringify(accounts, null, 4)
    fs.writeFileSync(path.join(__dirname, 'json','accounts.json'), accountsJSON, 'utf8');
    res.render('payment', {message: 'Payment Successful', account: accounts.credit});
})

//Port
app.listen(3000, function() {
    console.log('PS Project Running on port 3000!')
});