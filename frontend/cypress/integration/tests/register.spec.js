describe('Register test', () => {
  it('Registers new user', function() {
    // need to revisit this test once the register page pushes to db
    cy.visit('localhost:3000/register');
    cy.get('#username').type('exampleUser');
    cy.get('#email').type('exampleEmail@gmail.com');
    cy.get('#password').type('example');
    cy.get('#cpassword').type('example');
  });
});
