describe('Login test', () => {
  it('Logs into cloudhaven', function() {
    // hard coded login for now
    cy.visit('localhost:3000/login');
    cy.get('#username').type('user1');
    cy.get('#password').type('password!');
    cy.contains('Sign In').click();
    cy.url().should('include', '/home');
  });
});
