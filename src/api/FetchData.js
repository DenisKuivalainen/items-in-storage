const axios = require('axios');
const { curry } = require('ramda');

// fetchData:: a -> {b} -> Promise 
const fetchData = curry((url, params) => axios.get(url, params).then(res => res.json()));

module.exports = fetchData;