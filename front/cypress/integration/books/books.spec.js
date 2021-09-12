describe('Testing Books', () => {

    let seedBooks = 4;
    const url = 'http://localhost:3000/';

    context('Add new Book', () => {

        it('Checking book list', () => {
            cy.viewport(1400, 800);
            cy.visit(url);
            cy.get('.display-books-box div').should('have.length', seedBooks);
        });

        it('Add book', () => {
            cy.viewport(1400, 800);
            cy.visit(url);

            cy.get('.form').within(() => {
                cy.get('#title')
                    .type('Notas al pie de Gaza')
                    .invoke('prop', 'validity')
                    .should('deep.include', {
                        valid: true
                    });
                cy.get('#author')
                    .type('Joe Sacco')
                    .invoke('prop', 'validity')
                    .should('deep.include', {
                        valid: true
                    });
                cy.get('#year')
                    .type('2009')
                    .invoke('prop', 'validity')
                    .should('deep.include', {
                        valid: true
                    });
                cy.get('.add-button').click();
            });

            cy.get('.display-books-box div').should('have.length', ++seedBooks);
            cy.get('.display-books-box').contains(':nth-child(5) > h2', 'Notas al pie de Gaza');
        });

        it('Form fields validation validation', () => {
            cy.viewport(1400, 800);
            cy.visit(url);

            cy.get('.form').within(() => {
                cy.get('#title')
                    .invoke('prop', 'validity')
                    .should('deep.include', {
                        valid: false
                    });
                cy.get('#author')
                    .invoke('prop', 'validity')
                    .should('deep.include', {
                        valid: false
                    });
                cy.get('#year')
                    .invoke('prop', 'validity')
                    .should('deep.include', {
                        valid: false
                    });
            });
        });
    });

    context('Delete Book', () => {

        it('Delete book', () => {
            cy.viewport(1400, 800);
            cy.visit(url);
            cy.get(':nth-child(3) > .delete-button').click();
            cy.get('.display-books-box div').should('have.length', --seedBooks);
        });
    });
})