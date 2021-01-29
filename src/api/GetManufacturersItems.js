const { zipObj, sortBy, identity, dropRepeats, map, compose } = require("ramda");
const { mapP, composeP, viewOnPath } = require("ramda-godlike");
const { getItems } = require("./GetManufacturerItems");

// returns list of uniqeu manufacturers within category items
const getUniqManufacturers = compose(
    dropRepeats,
    sortBy(identity),
    map(viewOnPath(["manufacturer"]))
)

// get items for every manufacturer
const getAllItems = mapP(getItems);

// returns object of manufacturers name and products: 
// {name1: [items1], name2: [items2],...}
const getItemsObject = async (names) => zipObj(names, await getAllItems(names));

const getManufacturersItems = composeP(getItemsObject, getUniqManufacturers);

module.exports = { getManufacturersItems };

