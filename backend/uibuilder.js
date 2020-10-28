const axios = require('axios');
const https = require('https');

const loginPost = async (userToken, passToken) => {
  return axios.post("http://localhost:5000/login", 
  {
    username: userToken,
    password: passToken,
  })
  .then(post_res => {
    console.log(post_res.status);
    console.log("User " + userToken + " successfully logged in.");
    return post_res.status;
  })
  .catch(err => {
    console.log(err);
    return null;
  });
}

const getFormData = async () => {
  return axios.get('http://localhost:5000/form')
  .then(response => {
    return response;
  })
  .catch(error =>
    console.log(error));
}

const parseFormData = (formData) => {
  return new Form(formData['form_name'], formData['form_desc'], parseFields(formData['fields']));
}

const parseFields = (fieldsData) => {
  return fieldsData.map(field => new Field(field['field_type'], field['field_name']))
}

class Form {
  constructor(formName, formDesc, fields) {
    this.formName = formName;
    this.formDesc = formDesc;
    this.fields = fields;
  }

  numFields() {
    return this.fields.length;
  }
}

class Field {
  constructor(fieldType, fieldName) {
    this.fieldType = fieldType;
    this.fieldName = fieldName;
  }
}

module.exports = { loginPost, getFormData, parseFormData };
