import React from 'react';
import renderer from 'react-test-renderer';
import Layout from '../../src/client/Layout';
import { config } from '../../src/config';
import { useRouter } from "next/router";

jest.mock('../../src/config');
config.mockReturnValue(["boots", "hoodies"]);

jest.mock("next/router");
useRouter.mockImplementation(() => { return {push: () => {}, pathname: "boots"} });

describe("test Layout ", () => {
    test("sanpshot for categories 'boots' and 'hoodies' with a children saying 'sup'", () => {
        const tree = renderer.create(<Layout><p>sup</p></Layout>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})