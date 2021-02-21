const { concat } = require("ramda");
const { composeP } = require("ramda-godlike");
const { config } = require("../config");
const { fetchData } = require("./FetchData");
const { recursion } = require("./recursion");

const fetchCategory = composeP(
    fetchData,
    concat(config("api", "products", "url")),
)

module.exports = { getRowCategory: recursion(fetchCategory) };