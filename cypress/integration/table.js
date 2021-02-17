const { slice, toString } = require("ramda");

const changePage = (label, check) => {
    cy.get('button[aria-label="' + label + '"]')
        .click();

    cy.get('p[class="MuiTypography-root MuiTablePagination-caption MuiTypography-body2 MuiTypography-colorInherit"]')
        .invoke('text')
        .then(text => expect(slice(14, 14 + check.length, text)).equal(check));
}

const changeRowsPerPage = (n) => {
    cy.get('div[class="MuiSelect-root MuiSelect-select MuiTablePagination-select MuiSelect-selectMenu MuiInputBase-input"]')
        .click();

    cy.get('ul[class="MuiList-root MuiMenu-list MuiList-padding"]')
        .find('li')
        .contains(toString(n))
        .click();

    cy.get('tbody[class="MuiTableBody-root"]')
        .find('tr')
        .should('have.length', n);
}

describe("Testing table ", () => {
    beforeEach(() => cy.visit("/").get('span').contains("gloves").click());

    it("test page change", () => {
        changePage("Next page", "11-20");
        changePage("Next page", "21-30");
        changePage("Previous page", "11-20");
        changePage("Previous page", "1-10");
    });

    it("change rows per page", () => {
        changeRowsPerPage(100);
        changeRowsPerPage(25);
        changeRowsPerPage(10);
    });

    it("test table functionality", () => {
        cy.get('button[aria-label="Next page"]')
            .click();

        changeRowsPerPage(100); // here table should show 1 - 100 items
        changePage("Next page", "101-200"); // so, if I go to next page it should be 2nd (not 3rd) page
        changeRowsPerPage(25);
        changePage("Next page", "26-50");
        changeRowsPerPage(10);
        changePage("Next page", "11-20");
    });
});