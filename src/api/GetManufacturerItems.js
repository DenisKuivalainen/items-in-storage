const { __, concat } = require("ramda");
const { isArray, composeP, viewOnPath } = require("ramda-godlike");
const { config } = require("../config");
const { fetchData } = require("./FetchData");

// fetch and get data from incoming format
const requestForItems = composeP(
    viewOnPath(["response"]),
    fetchData,
    concat(config("api", "availability", "url"))
);

// get data anyway
const getItems = async (manufacturer) => {
    let depth = 0;

    // Check recursion depth
    const checkDepth = () => {
        depth++;
        if(depth > 5) throw "Too much recursion";
    }

    const fetchItems = async () => {
        checkDepth();

        let requestedItems = await requestForItems(manufacturer);

        return isArray(requestedItems) ?
            requestedItems :
            await fetchItems();
    }
    
    return await fetchItems();
}
module.exports = { getItems };