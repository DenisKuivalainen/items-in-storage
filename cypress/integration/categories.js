
const goTo = (url) => cy.get('span').contains(url).click();

const checkClass = (url, className) => cy.get('span').contains(url).parent().should('have.class', className);

const checkCategory = (category) => {
    checkClass(category, 'MuiButton-outlined');
    goTo(category);
    checkClass(category, 'MuiButton-contained');
    cy.url()
        .should('eq', 'http://localhost:3000/' + category)
}

describe("Testing category switch ", () => {
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
