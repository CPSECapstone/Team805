describe('Profile page test', () => {
  it('Verifies profile page pulls correct information', function() {
    // hard coding login to get to restricted route
    cy.visit('localhost:3000/login');
    cy.get('#username').type('user1');
    cy.get('#password').type('password!');
    cy.contains('Sign In').click();

    // test that profile page pulls from db
    cy.contains('Profile').click();
    cy.url().should('include', '/profile');
    // verify email is pulled
    cy.get('p').should('contain', 'testuser@gmail.com');
    // verify username is pulled
    cy.get('p').should('contain', 'testuser');
  });
});

