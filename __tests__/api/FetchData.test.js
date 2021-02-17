const { fetchData } = require('../../src/api/FetchData');
const axios = require('axios');

var testURL = 'http://feedm3.herokuapp.com/recipe?ing1=&ing2=&ing3=&rows=3&first=0';
var data = {response: [1, 2]};
var returned = {data: data};

jest.mock('axios');
axios.get.mockResolvedValue(returned);

describe('test FetchData ', () => {
    test('succesfuly fetch', () => {
        expect(fetchData(testURL)).resolves.toEqual(expect.objectContaining(data));
    });

    test('success after fail', () => { 
        var errorMsg = "Oh no :(";
        axios.get.mockRejectedValueOnce(errorMsg);
      
        expect(fetchData(testURL)).rejects.toEqual(errorMsg);
        expect(fetchData(testURL)).resolves.toEqual(expect.objectContaining(data));
    });
});