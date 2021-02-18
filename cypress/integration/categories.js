const gotoCategory = (category) => {
    cy.visit("/categories/" + category);

    cy.get('span')
        .contains(category)
        .parent()
        .should('have.class', 'MuiButton-contained');
}

describe("Testing category switch with URL ", () => {
    before(() => cy.visit("/"));

    it("categories/gloves", () => {
        gotoCategory("gloves");
    });
    it("categories/facemasks", () => {
        gotoCategory("facemasks");
    });
    it("categories/beanies", () => {
        gotoCategory("beanies");
    });
    it("404 - page not found", () => {
        cy.visit("/categories/ohNo", { failOnStatusCode: false });
        cy.contains("404 | This page could not be found.")
    });
});
