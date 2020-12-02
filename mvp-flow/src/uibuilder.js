const axios = require('axios');

export const loginPost = async (userToken, passToken) => {
  return axios.post("http://localhost:5000/login", 
  {
    username: userToken,
    password: passToken,
  })
  .then(post_res => {
    console.log("User " + userToken + " successfully logged in.");
    return post_res.status;
  })
  .catch(err => {
    console.log(err);
    return null;
  });
}

export const getFormData = async () => {
  return axios.get('http://localhost:5000/form')
  .then(response => {
    return response;
  })
  .catch(error =>
    console.log(error));
}