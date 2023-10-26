describe('Country Data App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001');
  });

  it('renders the form correctly', () => {
    cy.get('form').should('exist');
    cy.get('#country-input').should('exist');
    cy.get('input[type="submit"]').should('exist');
  });

  it('displays an error message when the input is empty', () => {
    cy.get('input[type="submit"]').click();
    cy.get('.error-message').should('contain', 'Please enter a country name.');
  });

  it('displays an error message when the input is invalid', () => {
    cy.get('#country-input').type('123');
    cy.get('input[type="submit"]').click();
    cy.get('.error-message').should('contain', 'Invalid input. Please enter a valid country name.');
  });

});
