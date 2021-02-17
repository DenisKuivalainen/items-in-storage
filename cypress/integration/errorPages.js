describe("Testing error handling ", () => {
    it("404 - page not found", () => {
        cy.visit("/ohNo", { failOnStatusCode: false });
        cy.contains("404 | This page could not be found.")
    });
});