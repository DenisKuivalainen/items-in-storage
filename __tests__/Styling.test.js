const { parseAvailability, capitalizeMultiple } = require("../src/api/Styling");

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