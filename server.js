const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();

});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

app.get('/', (request, response) => {

    response.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to my website',

    });

});

app.get('/about', (request, response) => {

    response.render('about.hbs', {
        pageTitle: 'About page'
    });

});

app.listen(3000);