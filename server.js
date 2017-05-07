/**
 * Created by mvuyy on 5/6/17.
 */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
    var date = new Date().toString();
    var method = request.method;
    var path = request.path;
    var log = `${date} - ${method} - ${path}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if(error)
            console.log(error.stack);
    })
    next();
});

//Maintenance Page
app.use((request, response, next) => {
    response.render('maintenance.hbs', {
        pageTitle: 'Maintenance',
        pageHeader: 'Currently Page is under maintenance. Please visit back later.'
    });
});

app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear();
});

hbs.registerHelper('welcomeMessage', (message) => {
   return message.toUpperCase();
});

//Creating Routes.
//Home Page
app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: `Home`,
        pageHeader: 'Welcome To Madhu\'s World!',
    });
});

//About Page
app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: `About`,
        pageHeader: 'ABOUT PAGE',
    });
});

//Invalid Pages
app.get('/bad', (request, response) => {
    response.send({
        error: 'Seems Like You Landed On An Invalid Page!'
    })
});


//Port On Which The Server Is Listening To.
app.listen(3000, (err) => {
    if (err)
        console.log('Unable to listen to port: 3000. Please check');

    console.log('Example App Listen To Port 3000');
});

