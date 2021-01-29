const { concat } = require("ramda");
const { composeP } = require("ramda-godlike");
const { fetchData } = require("./FetchData");
const { getManufacturersItems } = require("./GetManufacturersItems");
const { getObject } = require("./GetMergedObject");

const fetchCategory = composeP(
    url => fetchData(url, {headers: {"x-force-error-mode": "all"}}),
    concat("https://bad-api-assignment.reaktor.com/v2/products/"),
)

const getItems = async (category) => {
    // get all category items
    var categoryItems = await fetchCategory(category);
    
    // get all manufacturerrs items for the category
    var manufacturersItems = await getManufacturersItems(categoryItems);

    return getObject(categoryItems, manufacturersItems);
    
}

module.exports = { getItems };