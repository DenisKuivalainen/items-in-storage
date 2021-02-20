describe("Testing API ", () => {
    it("get data of selected category", () => {
        cy.request('/api/items?category=gloves')
            .then(res => {
                let body = JSON.parse(res.body);
                expect(body.data[0]).to.have.property('type', 'gloves');
                expect(body.status).to.equal(200);
            });
    });
    it("get data of unexisted category (404)", () => {
        cy.request({url: '/api/items?category=mushrooms',  failOnStatusCode: false})
            .then(res => {
                let body = JSON.parse(res.body);
                expect(body.data).to.equal('Not found (>人<)');
                expect(body.status).to.equal(404);
            });
    });
});