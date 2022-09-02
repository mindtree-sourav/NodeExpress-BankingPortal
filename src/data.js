const fs = require('fs');
const path = require('path');

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

//Function write JSON

const writeJSON = () => {
    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, 'json','accounts.json'), accountsJSON, 'utf8');
}

module.exports = {
    accounts,
    users,
    writeJSON
}