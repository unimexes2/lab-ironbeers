const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...
app.get("/", (req, res) => {
  // console.log(process.env.CLAVE_SECRETA)
  // res.send('Bonjour World! tu clave secreta es: ' + process.env.CLAVE_SECRETA)
  res.render("home.hbs");
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {

      
      res.render("beers.hbs", { beersFromApi});
      //res.send({beersFromApi  });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    
    let resp=responseFromAPI[0];
    console.log("ll",resp)
    res.render("random-beer.hbs", {resp})
  })
  .catch(error => console.log(error));
});


// Add the route handlers here:



app.listen(3001, () => console.log('🏃‍ on port 3000'));
