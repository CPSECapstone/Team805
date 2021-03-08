describe('Visits homepage', () => {
  it('Visits the CloudHaven Homepage', () => {
    cy.visit('http://localhost:3000');
    cy.contains('CloudHaven');
    cy.contains('Login');
  });
});

describe('Visits invalid page, checks for 404', () => {
  it('Visits a route that isn\'t valid', () => {
    cy.visit('http://localhost:3000/nopage');
    cy.contains('404');
    cy.url().should('include', '/404');
  });
});

describe('Checks to see if 404 page home link works', () => {
  it('Visits the 404 page and clicks on home link', () => {
    cy.visit('http://localhost:3000/404');
    cy.contains('Click Here').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});

describe('Does logging in work', () => {
  it('Doing all login stuff', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Login').click();
    cy.get('#username').type('user1');
    cy.get('#password').type('password!');
    cy.contains('Sign In').click();
  });
});
