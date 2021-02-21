const { __, concat } = require("ramda");
const { isArray, composeP, viewOnPath } = require("ramda-godlike");
const { config } = require("../config");
const { fetchData } = require("./FetchData");
const { recursion } = require("./recursion");

// fetch and get data from incoming format
const requestForItems = composeP(
    viewOnPath(["response"]),
    fetchData,
    concat(config("api", "availability", "url"))
);

module.exports = { getItems: recursion(requestForItems) };