import React from 'react';
import renderer from 'react-test-renderer';
import Error from '../../src/client/Error';

describe("test Error ", () => {
    test("sanpshot with message 'This is error'", () => {
        const tree = renderer.create(Error("This is error")).toJSON();
        expect(tree).toMatchSnapshot();
    });
})