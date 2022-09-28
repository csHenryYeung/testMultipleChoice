const express = require('express');
const hbs = require('hbs');
let firstController = require('./firstController')

let bodyParser = require('body-parser');

let app = express();
let port = 3000;

app.set('view engine', hbs);
firstController(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000);
console.log(`Server is up on port 3000`);
