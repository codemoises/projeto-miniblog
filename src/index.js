const express = require('express');
const cors = require('cors');
const connection = require('./database.js');
const basicAuth = require('express-basic-auth')
const routes = require('./routes.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('*', cors());
app.use(basicAuth({
    users: {
        admin: "secret"
    }
}))
connection();
app.use(routes);


app.listen(3000);