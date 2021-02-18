const { compose, toUpper, map, split, join, toLower, head, tail, converge, concat, curry, last, findIndex, nth, equals, append, trim, __ } = require("ramda");

//#region Capitalize string of words
const firstLetterToUpper = compose(toUpper, head);
const restToLower = compose(toLower, tail);
const capitalizeWord = converge(concat, [firstLetterToUpper, restToLower]);

const capitalizeMultiple = compose(join(" "), map(capitalizeWord), split(" "));
//#endregion

//#region Parse availability ML format ang get clear status
const substrHead =  curry((reg, str) => compose(head, split(reg))(str));
const substrLast =  curry((reg, str) => compose(last, split(reg))(str));

// switchCase:: a -> [b] -> [c] -> c
const switchEq = curry((expression, conditionValues, results) => {
    // TODO: add check isArray and check results have one more element (which is default value) than conditionValues, add to package.
    //       Instead of equals add support of provided function:: (a -> b) -> Bool
    // BUG: if array of functions is passed as result, it will launch all functions???
    let casePosition = findIndex(val => equals(expression, val), conditionValues);
    return nth(casePosition, results);
});

const means = val => switchEq(
    val,
    ["INSTOCK", "OUTOFSTOCK", "LESSTHAN10"],
    append(val, ["in stock", "out of stock", "less than 10"])
);

const parseAvailability = compose(means, trim, substrHead("</INSTOCKV"), substrLast("<INSTOCKVALUE>"));
//#endregion

module.exports = { capitalizeMultiple, parseAvailability, switchEq }