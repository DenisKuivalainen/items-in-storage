const { getItems } = require('../../src/api/GetManufacturerItems');
const { getManufacturersItems } = require('../../src/api/GetManufacturersItems');

var catArr = [
    {
      "id": "f33561de3a864f951a",
      "type": "jackets",
      "name": "EWHHOP ROOM",
      "color": [
        "blue"
      ],
      "price": 52,
      "manufacturer": "reps"
    },
    {
      "id": "0e4772c827c4296592fbd",
      "type": "jackets",
      "name": "WEERLEP METROPOLIS RAPTOR",
      "color": [
        "black"
      ],
      "price": 98,
      "manufacturer": "reps"
    },
    {
      "id": "6d39a08b3bcae88a67",
      "type": "jackets",
      "name": "DERWEER TYRANNUS BANG",
      "color": [
        "purple"
      ],
      "price": 15,
      "manufacturer": "abiplos"
    }
];
var manItems = [1, 2];
var manObject = {
    "reps":[1, 2],
    "abiplos":[1, 2]
};

jest.mock('../../src/api/GetManufacturerItems');
getItems.mockResolvedValue(manItems)

describe('test GetManufacturersItems ', () => {
    test('returns object of {manufacturer: [items],...}', () => {
        expect(getManufacturersItems(catArr)).resolves.toEqual(manObject);
    });
});