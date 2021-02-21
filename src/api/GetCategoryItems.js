const { getManufacturersItems } = require("./GetManufacturersItems");
const { getObject } = require("./GetMergedObject");
const { getRowCategory } = require("./GetRawCategoryItems");

const getItems = async (category) => {
    // get all category items
    var categoryItems = await getRowCategory(category);
    
    // get all manufacturerrs items for the category
    var manufacturersItems = await getManufacturersItems(categoryItems);

    return getObject(categoryItems, manufacturersItems);
    
}

module.exports = { getItems };