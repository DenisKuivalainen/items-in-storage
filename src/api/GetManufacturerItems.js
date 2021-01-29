const { __, concat } = require("ramda");
const { isArray, composeP, viewOnPath } = require("ramda-godlike");
const { fetchData } = require("./FetchData");

// fetch and get data from incoming format
const requestForItems = composeP(
    viewOnPath(["response"]),
    fetchData,
    concat("https://bad-api-assignment.reaktor.com/v2/availability/")
);

// get data anyway
const getItems = async (manufacturer) => {
    let requestedItems = await requestForItems(manufacturer);
    
    return isArray(requestedItems) ?
        requestedItems :
        await getItems(manufacturer);
}
module.exports = { getItems };