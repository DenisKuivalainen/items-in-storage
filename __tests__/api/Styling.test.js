const { __ } = require("ramda");
const { parseAvailability, capitalizeMultiple, switchEq } = require("../../src/api/Styling");

describe('test Styling ', () => {
    test('parse availability with match', () => {
        expect(parseAvailability("<AVAILABILITY>\n  <INSTOCKVALUE>INSTOCK</INSTOCKVALUE>\n</AVAILABILITY>")).toEqual("in stock");
    });
    test('parse availability with default', () => {
        expect(parseAvailability("<AVAILABILITY>\n  <INSTOCKVALUE>MORETHAN10</INSTOCKVALUE>\n</AVAILABILITY>")).toEqual("MORETHAN10");
    });

    test('capitalize first letters of words, others are lowercase', () => {
        expect(capitalizeMultiple("ALL my LoIf")).toEqual("All My Loif");
    });
});

describe('test sqitchEq ', () => {
    let conditionValues = [0, 1, 2, 3, 4];
    let results = ["a", "b", "c", "d", "e", "f"];
    const abcSwitch = switchEq(__, conditionValues, results);

    test('value matches case', () => {
        expect(abcSwitch(0)).toEqual("a");
        expect(abcSwitch(1)).toEqual("b");
        expect(abcSwitch(4)).toEqual("e");
    });

    test('value not matches case', () => {
        expect(abcSwitch(8)).toEqual("f");
        expect(abcSwitch(23)).toEqual("f");
    });
});