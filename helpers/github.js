const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {

  let options = {
    method: 'get',
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  return axios(options);
}

module.exports.getReposByUsername = getReposByUsername;