import { data } from "../src/fakeData";

describe('test fakeData ', () => {
    test('how the array is built', () => {
        let val = data(1)[0];
        expect(val.id).toEqual(0);
        expect(val.type).toEqual("tp-a");
        expect(val.name).toEqual("nm-a");
        expect(val.color).toEqual("cl-a");
        expect(val.price).toEqual("762$");
        expect(val.manufacturer).toEqual("mn-a");
        expect(val.availability).toEqual("av-a");
    });
});