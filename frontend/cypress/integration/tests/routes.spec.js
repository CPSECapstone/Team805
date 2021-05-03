describe('Visits profile page without being logged in', () => {
  it('Tries to visit restricted route', () => {
    cy.visit('http://localhost:3000/profile');
    cy.url().should('include', '/login');
    cy.contains('CloudHaven');
    cy.contains('Login');
  });
});

describe('Visits marketplace without being logged in', () => {
  it('Tries to visit restricted route', () => {
    cy.visit('http://localhost:3000/market');
    cy.url().should('include', '/login');
    cy.contains('CloudHaven');
    cy.contains('Login');
  });
});

describe('Visits home page without being logged in', () => {
  it('Tries to visit restricted route', () => {
    cy.visit('http://localhost:3000/home');
    cy.url().should('include', '/login');
    cy.contains('CloudHaven');
    cy.contains('Login');
  });
});

describe('Visits profile page with login', () => {
  it('Verifies profile page pulls correct information', function() {
    cy.visit('localhost:3000/login');
    cy.get('#username').type('myusername');
    cy.get('#password').type('mypassword');
    cy.contains('Sign In').click();

    cy.contains('Profile').click();
    cy.url().should('include', '/profile');
  });
});

