const { get } = require('axios');
const { viewOnPath, composeP } = require('ramda-godlike');

const fetchData = composeP(viewOnPath(["data"]), get);

module.exports = { fetchData };