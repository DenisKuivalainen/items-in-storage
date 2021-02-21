const { recursion } = require("../../src/api/recursion");

describe('test recursion', () => {
    test('success recursion', async () => {
        let arr = [1, 2]
        const withSuccess = jest.fn().mockReturnValue(arr).mockReturnValueOnce("[]");
        let resp = await recursion(withSuccess)();

        expect(resp).toEqual(arr);
        expect(withSuccess.mock.calls.length).toBe(2);
    });

    test('throw Promise Rejection', async () => {
        const withFail = jest.fn().mockReturnValue("[]");
        let resp = await recursion(withFail)().catch(e => e);
        
        expect(resp).toBe("Too much recursion");
        expect(withFail.mock.calls.length).toBe(5);
    });
});