const { get } = require('axios');
const { viewOnPath, composeP } = require('ramda-godlike');

// fetchData:: * -> Promise
const fetchData = composeP(viewOnPath(["data"]), get);

module.exports = { fetchData };