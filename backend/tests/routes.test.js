/**
 * @jest-environment node
 */
require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const usersModel = require('../models/users');
const testUser = 'test';
const testPass = 'test';
const testUserId = '603566d77a0a7528b8742489';

// Setup
const baseURL = 'http://localhost:3001';
beforeAll(async () => {
  const dbuser = process.env.dbuser;
  const dbpass = process.env.dbpass;
  mongoose.set('useFindAndModify', false);
  await mongoose.connect('mongodb+srv://' + dbuser + ':' + dbpass + '@cloudhaven.92yac.mongodb.net/CloudHaven?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
});

// Full user data route
test('should retrieve relevant user data', async () => {
  return await axios.get(baseURL + '/users/0/all')
      .then((response) => {
        expect(response.data)
            .toStrictEqual({email: 'testuser@gmail.com', username: 'testuser'});
      });
});

// Full user data route failure
test('should fail to find user and return error', async () => {
  return await axios.get(baseURL + '/users/-1/all')
      .then((response) => {
        expect(response.data)
            .toEqual('No user found with userId: -1');
      });
});

// User email route
test('should retrieve user email', async () => {
  return await axios.get(baseURL + '/users/0/email')
      .then((response) => {
        expect(response.data)
            .toStrictEqual('testuser@gmail.com');
      });
});

// User email route failure
test('should fail to find user and return error', async () => {
  return await axios.get(baseURL + '/users/-1/email')
      .then((response) => {
        expect(response.data)
            .toEqual('No user found with userId: -1');
      });
});

// User username route
test('should retrieve user username', async () => {
  return await axios.get(baseURL + '/users/0/username')
      .then((response) => {
        expect(response.data)
            .toStrictEqual('testuser');
      });
});

// User username route failure
test('should fail to find user and return error', async () => {
  return await axios.get(baseURL + '/users/-1/username')
      .then((response) => {
        expect(response.data)
            .toEqual('No user found with userId: -1');
      });
});

// User subscribed services route
test('should retrieve user subscribed services', async () => {
  const response = await axios.post(baseURL + '/login',
      {username: testUser, password: testPass});
  axios.defaults.headers.cookie = response.headers['set-cookie'];
  return await axios.get(baseURL + '/users/services')
      .then((response) => {
        expect(response.data)
            .toEqual([
              {'_id': '601c2620f7acaeedf64b950e',
                'serviceId': '1',
                'name': 'Email',
                'link': '/',
                'isFavorite': true},
              {'_id': '602da029c4d296ff91c864cc',
                'serviceId': '3',
                'name': 'Sample Flow',
                'link': 'sampleflow',
                'isFavorite': false},
              {'_id': '602da05bc4d296ff91c864ce',
                'serviceId': '5',
                'name': 'Google Docs',
                'link': '/',
                'isFavorite': false}]);
      });
});

// User subscribed services route failure
test('should fail to find user and return error', async () => {
  axios.defaults.headers.cookie = null;
  return await axios.get(baseURL + '/users/services')
      .catch((err) => expect(err.response.status).toEqual(401));
});

// User add subscribed service route
test('should add specific service to user services', async () => {
  const response = await axios.post(baseURL + '/login',
      {username: testUser, password: testPass});
  axios.defaults.headers.cookie = response.headers['set-cookie'];
  await axios.post(baseURL + '/users/services', {serviceId: '0'});
  return usersModel.findOne({_id: testUserId}, function(err, userData) {
    if (err) {
      throw new Error();
    } else {
      expect(userData.serviceIds).toContain('0');
    }
  });
});

// User add subscribed service route failure
test('should fail to find user and return error', async () => {
  axios.defaults.headers.cookie = null;
  return await axios.post(baseURL + '/users/services')
      .catch((err) => expect(err.response.status).toEqual(401));
});

// User remove subscribed service route
test('should remove specific service to user services', async () => {
  const response = await axios.post(baseURL + '/login',
      {username: testUser, password: testPass});
  axios.defaults.headers.cookie = response.headers['set-cookie'];
  await axios.delete(baseURL + '/users/services', {data: {serviceId: '0'}});
  return usersModel.findOne({_id: testUserId}, function(err, userData) {
    if (err) {
      throw new Error();
    } else {
      expect(userData.serviceIds).not.toContain('0');
    }
  });
});

// User remove subscribed service route failure
test('should fail to find user and return error', async () => {
  axios.defaults.headers.cookie = null;
  return await axios.delete(baseURL + '/users/services')
      .catch((err) => expect(err.response.status).toEqual(401));
});

// All services route
test('should retrieve a list of the user services', async () => {
  return await axios.get(baseURL + '/services')
      .then((response) => {
        expect(response.data)
            .toContainEqual(
                {'_id': '6009e948515479572dd8d82e',
                  'serviceId': '0',
                  'name': 'TestService',
                  'link': '/'});
      });
});

// Teardown
afterAll(() => {
  mongoose.connection.close();
});
