describe("Testing New Book Form", () => {

    let seedBooks = 4;

    context("Add book", () => {

        it("Checking book list", () => {
            cy.viewport(1400, 800);
            cy.visit("http://localhost:3000/");
            cy.get(".display-books-box div").should("have.length", seedBooks);
        })

        it("Add book", () => {
            cy.viewport(1400, 800);
            cy.visit("http://localhost:3000/");
            cy.get("#title").type("random title");
            cy.get("#author").type("random author");
            cy.get("#year").type("2000");
            cy.get(".add-button").click();
            cy.get(".display-books-box div").should("have.length", ++seedBooks);
        })
    })

})