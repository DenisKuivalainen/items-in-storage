import React from 'react';
import renderer from 'react-test-renderer';
import Nav from "../../src/client/Nav";
import { useRouter } from "next/router";



jest.mock("next/router");
useRouter.mockImplementation(() => { return {push: () => {}, pathname: "boots"} });

describe("test Nav ", () => {
    test("sanpshot for categories 'boots' and 'hoodies'", () => {
        const tree = renderer.create(Nav(["boots", "hoodies"])).toJSON();
        expect(tree).toMatchSnapshot();
    });
})