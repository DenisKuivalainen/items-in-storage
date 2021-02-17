const { fetchData } = require("../../src/api/FetchData");
const { getManufacturersItems } = require("../../src/api/GetManufacturersItems");
const { getItems } = require("../../src/api/GetCategoryItems");

var catArr = [
    {
      "id": "f33561de3a864f951a",
      "type": "jackets",
      "name": "EWHHOP ROOM",
      "color": [
        "blue", "red"
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
var manObject = {
    "reps":[
        {
            "id": "F33561DE3A864F951A",
            "DATAPAYLOAD": "<AVAILABILITY>\n  <INSTOCKVALUE>INSTOCK</INSTOCKVALUE>\n</AVAILABILITY>"
        },
        {
            "id": "0E4772C827C4296592FBD",
            "DATAPAYLOAD": "<AVAILABILITY>\n  <INSTOCKVALUE>INSTOCK</INSTOCKVALUE>\n</AVAILABILITY>"
        }
    ],
        "abiplos":[{
            "id": "6D39A08B3BCAE88A67",
            "DATAPAYLOAD": "<AVAILABILITY>\n  <INSTOCKVALUE>INSTOCK</INSTOCKVALUE>\n</AVAILABILITY>"
        },
        {
            "id": "8A683330A1D04FCB0E9A75",
            "DATAPAYLOAD": "<AVAILABILITY>\n  <INSTOCKVALUE>OUTOFSTOCK</INSTOCKVALUE>\n</AVAILABILITY>"
        },
        {
            "id": "FAA32D49205765B4608D93",
            "DATAPAYLOAD": "<AVAILABILITY>\n  <INSTOCKVALUE>INSTOCK</INSTOCKVALUE>\n</AVAILABILITY>"
        }
    ]
};
var resArr = [
    {
      id: 'f33561de3a864f951a',
      type: 'jackets',
      name: 'Ewhhop Room',
      color: 'blue, red',
      price: 52,
      manufacturer: 'Reps',
      availability: 'in stock'
    },
    {
      id: '0e4772c827c4296592fbd',
      type: 'jackets',
      name: 'Weerlep Metropolis Raptor',
      color: 'black',
      price: 98,
      manufacturer: 'Reps',
      availability: 'in stock'
    },
    {
      id: '6d39a08b3bcae88a67',
      type: 'jackets',
      name: 'Derweer Tyrannus Bang',
      color: 'purple',
      price: 15,
      manufacturer: 'Abiplos',
      availability: 'in stock'
    }
]

jest.mock("../../src/api/FetchData");
fetchData.mockResolvedValue(catArr);

jest.mock("../../src/api/GetManufacturersItems");
getManufacturersItems.mockResolvedValue(manObject);

describe('test GetCAtegoryItems ', () => {
    test('get object of category items with availability', () => {
        expect(getItems("gloves")).resolves.toEqual(resArr);
    });
});