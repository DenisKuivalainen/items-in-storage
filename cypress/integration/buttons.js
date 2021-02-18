const checkClass = (url, className) => cy.get('span').contains(url).parent().should('have.class', className);

const checkCategory = (category) => {
    checkClass(category, 'MuiButton-outlined');

    cy.get('span').contains(category).click();

    checkClass(category, 'MuiButton-contained');

    cy.url()
        .should('eq', 'http://localhost:3000/' + category);

    cy.get('div').should('have.class', 'loading');
}

describe("Testing category switch with buttons ", () => {
    before(() => cy.visit("/"));

    it("none selected", () => {
        checkClass('gloves', 'MuiButton-outlined');
        checkClass('facemasks', 'MuiButton-outlined');
        checkClass('beanies', 'MuiButton-outlined');
    });

    it("select gloves", () => {
        checkCategory("gloves");
    });
    it("select facemasks", () => {
        checkCategory("facemasks");
    });
    it("select beanies", () => {
        checkCategory("beanies");
    });
    it("select gloves again", () => {
        checkCategory("gloves");
    });
});
