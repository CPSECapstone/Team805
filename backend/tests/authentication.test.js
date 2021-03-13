/**
 * @jest-environment node
 */
const axios = require('axios');
const mongoose = require('mongoose');
const usersModel = require('../models/users');

// Setup
const baseURL = 'http://localhost:3001';
beforeAll(async () => {
  const dbuser = process.env.dbuser;
  const dbpass = process.env.dbpass;
  mongoose.set('useFindAndModify', false);
  await mongoose.connect('mongodb+srv://' + dbuser + ':' + dbpass + '@cloudhaven.92yac.mongodb.net/CloudHaven?retryWrites=true&w=majority', {useNewUrlParser: true});
});

// Verify user exists in the database
test('should verify if the user already exists in DB', async () => {
  return await axios.get(baseURL)
      .then((response) => {
        expect(response.data)
            .toEqual({username: 'sample_user1' password: password});
      });
});

// Test if user does not exist
test('should verify if user does not exist when loggin in', async () => {
  return await axios.get(baseURL)
      .then((response) => {
        expect(response.data)
            .toEqual('No user found with username: sample_user0');
      });
});

// Verify that user was registered
test('should verify that user has been registered in the database', async () => {
  return await axios.get(baseURL)
      .then((response) => {
        expect(response.data)
            .toEqual('username: sample_user2, email: sample_user2@email.com');
      });
});

// Verify you cannot register a new user with the same username
test('should verify that username has been taken', async () => {
    return await axios.get(baseURL)
        .then((response) => {
          expect(response.data)
              .toEqual('username already exists');
        });
  });

