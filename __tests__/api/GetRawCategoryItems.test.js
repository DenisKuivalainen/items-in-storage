const FetchData = require('../../src/api/FetchData');
const { getRowCategory } = require('../../src/api/GetRawCategoryItems');

var arr = [1, 2];
var str = '[]';

jest.mock('../../src/api/FetchData');
FetchData.fetchData.mockResolvedValue(arr).mockResolvedValueOnce(str);

describe('test GetRawCategoryItems ', () => {
    test('fetch returns String, and then Array', () => {
        expect(getRowCategory('glasses')).resolves.toEqual(arr);
    });

    test('fetch was called 2 times', async () => {
        expect(FetchData.fetchData).toHaveBeenCalledTimes(2);
    });
});