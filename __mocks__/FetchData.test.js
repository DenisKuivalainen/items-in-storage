const fetchData = require('../src/api/FetchData');
const axios = require('axios');

// global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
//     json: () => Promise.resolve('Hello here')
// }));

const testURL = 'http://feedm3.herokuapp.com/recipe?ing1=&ing2=&ing3=&rows=3&first=0';

describe('test FetchData ', () => {
    jest.mock('axios');

    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve('Hello here')
    }));

    it('with success', () => {
        expect(fetchData(testURL, {})).resolves.toEqual('Hello here');
    })

    it('with failure', () => {
        jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('some error'));
        expect(fetchData(testURL, {})).rejects.toThrow('some error');
    })
})