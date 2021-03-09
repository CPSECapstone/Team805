const backend = 'localhost:3001';
const testUsername = 'test';
const testPassword = 'test';
// Must be running the auth server for all tests.

describe('Login test', () => {
  it('Logs into cloudhaven', function() {
    // hard coded login for now
    cy.request('POST', backend + '/login', 
      { username: testUsername, password: testPassword});
  });
});

describe('Get user services test', () => {
  it('Logs into cloudhaven, then gets services', function() {
    // hard coded login for now
    cy.request('POST', backend + '/login', 
      { username: testUsername, password: testPassword})
      .then((response) => {
        cy.request('GET', backend + '/users/services')
        .then((response) => {
          expect(response.body).to.have.length(3);
        })
      })
  });
});

describe('Unauthorized test', () => {
  it('gets services without authorization', function() {
    cy.request({ 
      method: 'GET', 
      url: backend + '/users/services', 
      failOnStatusCode: false
    })
    .then((response) => {
      expect(response.status).to.eq(401);
    })
  });
});

describe('Refresh accessToken', () => {
  it('Logs into cloudhaven, then refreshes token', function() {
    // hard coded login for now
    cy.request('POST', backend + '/login', 
      { username: testUsername, password: testPassword})
      .then((response) => {
        // we can't access the tokens to test they are different.
        cy.request('POST', backend + '/token');
      })
  });
});