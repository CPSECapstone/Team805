const uibuilder = require('../../frontend/src/uibuilder');

// will not pass unless venodr api is running
test('login should be successful', () => {
  return uibuilder.loginPost('testUser', 'testPassword')
  .then(data => {
    expect(data).toBe(200);
  });
});