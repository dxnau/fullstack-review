const express = require('express');
const helper = require('../helpers/github.js');
const db = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  helper.getReposByUsername(req.body.gitHubName)
    .then((repos) => {
      db.save(repos.data);
      res.status(201).send('Successfully posted users repos to DB!');
    })
    //Map through repos array and call save with each repo obj
    .catch((err) => {
      res.status(404).send('Error saving user repos to DB');
    })
});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  db.retrieve()
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((err) => {
    res.status(404).send('Error retrieving repos');
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

