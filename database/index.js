const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: Number,
  username: String,
  repoName: String,
  repoURL: {type: String, unique: true},
  stars: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  //variable to map
  let map = repos.map((repo) => {
    let obj = {
      id: repo.id,
      username: repo.owner.login,
      repoName: repo.name,
      repoURL: repo.html_url,
      stars: repo.stargazers_count
    }
    console.log('Obj is: ', obj);

    return obj;
  });

  return Repo.create(map).catch((err) => console.log(err));
}

let retrieve = () => {
  return Repo.find({})
  .limit(25)
  .sort({stars: 'descending'})
  .catch((err) => {console.log('Error finding repos')});
}

module.exports.save = save;
module.exports.retrieve = retrieve;