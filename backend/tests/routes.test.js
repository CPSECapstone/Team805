// FILE routes.test.js

/**
 * @jest-environment node
 */
const axios = require('axios');
const mongoose = require('mongoose');
const usersModel = require('../models/users');

beforeAll(async () => {
  const dbuser = process.env.dbuser;
  const dbpass = process.env.dbpass;
  mongoose.set('useFindAndModify', false);
  await mongoose.connect('mongodb+srv://' + dbuser + ':' + dbpass + '@cloudhaven.92yac.mongodb.net/CloudHaven?retryWrites=true&w=majority', {useNewUrlParser: true});
});

// Full user data route
test('should retrieve relevant user data', async () => {
  return await axios.get('http://localhost:3001/users/0')
      .then((response) => {
        expect(response.data)
            .toStrictEqual({email: 'testuser@gmail.com', username: 'testuser'});
      });
});

// User email route
test('should retrieve user email', async () => {
  return await axios.get('http://localhost:3001/users/0/email')
      .then((response) => {
        expect(response.data)
            .toStrictEqual('testuser@gmail.com');
      });
});

// User username route
test('should retrieve user username', async () => {
  return await axios.get('http://localhost:3001/users/0/username')
      .then((response) => {
        expect(response.data)
            .toStrictEqual('testuser');
      });
});

// User subscribed services route
test('should retrieve user subscribed services', async () => {
  return await axios.get('http://localhost:3001/users/0/services')
      .then((response) => {
        expect(response.data)
            .toStrictEqual([
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

// All services route
test('should retrieve all available user services', async () => {
  return await axios.get('http://localhost:3001/services')
      .then((response) => {
        expect(response.data)
            .toStrictEqual([
              {'_id': '6009e948515479572dd8d82e',
                'serviceId': '0',
                'name': 'TestService',
                'link': '/'},
              {'_id': '601c2620f7acaeedf64b950e',
                'serviceId': '1',
                'name': 'Email',
                'link': '/'},
              {'_id': '601c264ff7acaeedf64b950f',
                'serviceId': '2',
                'name': 'OneDrive', 'link': '/'},
              {'_id': '602da029c4d296ff91c864cc',
                'serviceId': '3', 'name': 'Sample Flow',
                'link': 'sampleflow'},
              {'_id': '602da039c4d296ff91c864cd',
                'serviceId': '4',
                'name': 'Google Sheets',
                'link': '/'},
              {'_id': '602da05bc4d296ff91c864ce',
                'serviceId': '5',
                'name': 'Google Docs',
                'link': '/'}]);
      });
});

// User add subscribed service route
test('should add specific service to user services', async () => {
  await axios.post('http://localhost:3001/users/0/services', {serviceId: '0'});
  return usersModel.findOne({userId: 0}, function(err, userData) {
    if (err) {
      throw new Error();
    } else {
      expect(userData.serviceIds).toContain('0');
    }
  });
});

// User remove subscribed service route
test('should remove specific service to user services', async () => {
  await axios.delete('http://localhost:3001/users/0/services', {data: {serviceId: '0'}});
  return usersModel.findOne({userId: 0}, function(err, userData) {
    if (err) {
      throw new Error();
    } else {
      expect(userData.serviceIds).not.toContain('0');
    }
  });
});

afterAll(() => {
  mongoose.connection.close();
});
