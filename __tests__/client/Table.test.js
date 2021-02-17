import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from "@testing-library/react";
import TableElement from "../../src/client/Table";
import { data } from "../../src/fakeData";

describe("test TableElement ", () => {
    const Table = ({n}) => TableElement(data(n), 500);

    test("sanpshot with values length of 4", () => {
        const tree = renderer.create(<Table n={4}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("forward and backward buttons functionality", () => {
        const { getByTitle } = render(<Table n={24}/>);
        const towardBtn = getByTitle("Next page");
        const backBtn = getByTitle("Previous page");
        const getCellValue = () => screen.getAllByRole('cell')[0].textContent;

        // id of element n will be lower than id of element n + m (n >= 0 && m > 0)
        // So, if I want to check element on page 2 (we have m elements per page), 
        // the first element of the page will be n + m, while on the page 1 it will be n

        let first = getCellValue();
        
        // Go 2 pages forward
        fireEvent.click(towardBtn);
        fireEvent.click(towardBtn);
        let third = getCellValue();

        // Go 1 page backward
        fireEvent.click(backBtn);
        let second = getCellValue();

        expect(first).toEqual("0");
        expect(second).toEqual("10");
        expect(third).toEqual("20");
    });
})