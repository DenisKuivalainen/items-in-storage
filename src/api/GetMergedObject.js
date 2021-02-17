const { find, propEq, curry, toUpper, compose, __, assoc, map, append, join } = require("ramda")
const { viewOnPath, setOnPath, composeP } = require("ramda-godlike");
const { parseAvailability, capitalizeMultiple } = require("./Styling");

//#region getAvailability:: a -> {k: [v]} -> String
const getAvailability = curry((catItem, manObject) => {
    let mArr = compose(
        viewOnPath(__, manObject),
        append(__, []),
        viewOnPath(["manufacturer"])
    )(catItem);

    let availability =  compose(
        parseAvailability,
        viewOnPath(["DATAPAYLOAD"]),
        find(__, mArr),
        propEq("id"),
        toUpper,
        viewOnPath(["id"])
    )(catItem);

    return availability;
}); 
//#endregion

//#region  getNewObject:: a -> {k: [v]} -> {k: v}
const editItem = curry((catItem, manObject) => {
    const editValue = curry((fn, key, obj) => { //apply a function to value with key
        let path = append(key, []);
        return compose(
            setOnPath(path, __, obj),
            fn,
            viewOnPath(path)
        )(obj)
    });

    //how to edit values
    var capitalizeValue = editValue(capitalizeMultiple);
    var joinValue = editValue(join(", "));
    
    return compose(
        joinValue("color"),
        capitalizeValue("name"),
        capitalizeValue("manufacturer"),
        item => assoc("availability", getAvailability(item, manObject), item) //allways before capitalizeValue("manufacturer"), or use toLower
    )(catItem);
});
//#endregion

// getObject:: [a] -> {k: [v]} -> [a]
const getObject = (categoryItems, categoryManufacturers) => map(editItem(__, categoryManufacturers), categoryItems);

module.exports = { getObject };