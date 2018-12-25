const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/api/favorites', (req, res) => {

  /**
   * A rather bad solution to makesure we don't save movie thats already in our database.
   * But since we're not dealing with any real db here,
   * this would do for now.
   */
  const movies = JSON.parse(fs.readFileSync('./data.json'));
  movies.forEach((movie) => {
    if(movie.imdbID === req.body.imdbID) {
      res.send("This movie is already in your favorites list.")
      return;
    }
  })

  if(!req.body.Title || !req.body.imdbID){
    res.send("Error");
    return;
  }
  var data = JSON.parse(fs.readFileSync('./data.json'));
  data.push(req.body);
  fs.writeFile('./data.json', JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
})

app.get('/api/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

app.listen(3000, function(){
  console.log("Listening on port 3000");
});