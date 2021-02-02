const { concat } = require("ramda");
const { composeP } = require("ramda-godlike");
const { config } = require("../config");
const { fetchData } = require("./FetchData");
const { getManufacturersItems } = require("./GetManufacturersItems");
const { getObject } = require("./GetMergedObject");

const fetchCategory = composeP(
    fetchData,
    concat(config("api", "products", "url")),
)

const getItems = async (category) => {
    // get all category items
    var categoryItems = await fetchCategory(category);
    
    // get all manufacturerrs items for the category
    var manufacturersItems = await getManufacturersItems(categoryItems);

    return getObject(categoryItems, manufacturersItems);
    
}

module.exports = { getItems };