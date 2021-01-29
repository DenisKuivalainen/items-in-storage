const FetchData = require('../src/api/FetchData');
const { getItems } = require('../src/api/GetManufacturerItems');

const mockObject = (val) => {return {response: val}};
var arr = [1, 2];
var str = '[]';

jest.mock('../src/api/FetchData');
FetchData.fetchData.mockResolvedValue(mockObject(arr)).mockResolvedValueOnce(mockObject(str));

describe('test GetManufacturerItems ', () => {
    test('fetch returns String, and then Array', () => {
        expect(getItems('nuke')).resolves.toEqual(arr);
    });

    test('fetch was called 2 times', async () => {
        expect(FetchData.fetchData).toHaveBeenCalledTimes(2);
    });
});