/**
 * @jest-environment node
 */
const axios = require('axios');
const mongoose = require('mongoose');
const testUser = 'test';
const testPass= 'test';

// Setup
const baseURL = 'http://localhost:3001';
beforeAll(async () => {
  const dbuser = process.env.dbuser;
  const dbpass = process.env.dbpass;
  mongoose.set('useFindAndModify', false);
  await mongoose.connect('mongodb+srv://' + dbuser + ':' + dbpass + '@cloudhaven.92yac.mongodb.net/CloudHaven?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
});

// User not logged in, unauthorized services route
test('should recieve an error', async () => {
  return await axios.get(baseURL + '/users/services')
      .catch((err) => expect(err.response.status).toEqual(401));
});

// Login route
test('should login successfully', async () => {
  return await axios.post(baseURL + '/login',
      {username: testUser, password: testPass})
      .then((response) => {
        expect(response.status).toEqual(200);
      });
});

// Refresh token route
test('should refresh accessToken', async () => {
  const response = await axios.post(baseURL + '/login',
      {username: testUser, password: testPass});
  axios.defaults.headers.cookie = response.headers['set-cookie'];
  return await axios.post(baseURL + '/token')
      .then((response) => {
        expect(response.status).toEqual(200);
      });
});

// Teardown
afterAll(() => {
  mongoose.connection.close();
});
