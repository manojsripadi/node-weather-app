const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const weatherReport = require('./utils/forecast');
const chalk = require('chalk');

const app = express(); // generated an application

//app.com
//app.com/page
//app.com/about

const name = 'manoj';
const port = process.env.PORT || 3000;

// define paths to express config
const publicDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '/templates/views');
const partailsPath = path.join(__dirname, '/templates/partials');

// setup handlebars engine & view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partailsPath);

//setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name
  });
});

app.get('/help', (req, res) => {
  res.render('index', {
    title: 'Help Page',
    name
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address parameter missing'
    });
  }
  geoCode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    } else {
      console.log(data.placeName);
      weatherReport(data.latLong, (error, response) => {
        if (error) {
          return res.send({ error });
        } else {
          return res.send({
            temperature: response.temperature,
            feelsLike: response.feelsLike,
            address: data.placeName
          });
        }
      });
    }
  });
});

app.get('/product', (req, res) => {
  //example of a query string
  if (!req.query.search) {
    res.send({
      error: 'Search parameter is missing'
    });
  } else {
    res.send({
      products: []
    });
  }
});

app.get('/html', (req, res) => {
  res.send('<h1>HTML Page</h1>');
});

app.get('/json', (req, res) => {
  res.send({
    name,
    age: 28
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    name,
    msg: 'Help article not found'
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    name,
    msg: '404 Page Not Found'
  });
});

app.listen(port, () => {
  //starts the server
  console.log('Server up and running on port' + port);
});
