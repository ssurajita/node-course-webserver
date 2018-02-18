const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;


var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}` ;
  fs.appendFile('server.log', log + '\n' , (err) => {
    if(err){
        console.log('Unable to append to server.log');
    }
  })
//  console.log(`${now}: ${req.method} ${req.url}` );
  next();
})

app.use((req,res,next) => {
  res.render('maintenance.hbs');
  //next();
});


hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
})

app.get('/', (req,res) => {
  // res.send({
  //   name : 'soumya',
  //   likes : [ 'bicking', 'cities' ]
  // })

  res.render('home.hbs',{
    pageTitle : 'Home Page -- This is page title!!',
    welcomeMessage : 'Welcome to express templating example!!'
    //currentYear : new Date().getFullYear()

  });
});

app.get('/about', (req,res) => {
//  res.send('About page');
//  res.render('about.hbs');
res.render('about.hbs',{
  pageTitle : 'About Page -- This is page title!!'
  //currentYear : new Date().getFullYear()
});
});


app.get('/bad', (req,res) => {
  res.send({
    errorMessage : 'Unabe to handle Request'
  });

});

app.listen(port, () => {
  console.log(`server is up on port ${port} and will b ready in 3000ms`);
});

module.exports.app = app;
