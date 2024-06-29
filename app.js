const express = require('express');
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.get('/dynamic-ejs', (req, res) => {
  const data = {
    message: 'Hello, dynamic EJ world!',
    date: new Date().toLocaleDateString(),
  };
  res.render('dynamic-template', { data });
});

app.get('/', (req, res) => {
  res.send(`
    <H1>Hello, Express!</h1>`);
});

// app.get('/account', ensureAuthenticated (req, res) => {
//     res.render
// })

module.exports = app;
