const uibuilder = require('../uibuilder');

// will not pass unless api is running
test('login should be successful', () => {
  return uibuilder.loginPost('testUser', 'testPassword')
  .then(data => {
    expect(data).toBe(200);
  });
});