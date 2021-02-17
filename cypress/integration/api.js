describe("Testing API ", () => {
    it("get data of selected category", () => {
        cy.request('/api/items?category=gloves')
            .then(res => {
                expect(res.body[0]).to.have.property('type', 'gloves');
                expect(res.status).to.equal(200);
            });
    });
    it("get data of unexisted category (404)", () => {
        cy.request({url: '/api/items?category=mushrooms',  failOnStatusCode: false})
            .then(res => {
                expect(res.body).to.equal('Not found');
                expect(res.status).to.equal(404);
            });
    });
});