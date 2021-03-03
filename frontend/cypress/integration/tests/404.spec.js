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
  });
});
