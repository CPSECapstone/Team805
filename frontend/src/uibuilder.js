const axios = require('axios');

const loginPost = async (userToken, passToken) => {
  return axios.post('http://localhost:5000/login',
      {
        username: userToken,
        password: passToken,
      })
      .then((response) => {
        return response.status;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
};

const formPost = async (formData) => {
  console.log('something happened');
  return axios.post('http://localhost:5000/form', formData)
      .then((response) => {
        return response.status;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
};

const getFormData = async () => {
  return axios.get('http://localhost:5000/form')
      .then((response) => {
        return response;
      })
      .catch((error) =>
        console.log(error));
};

const parseFormData = (formData) => {
  return new Form(formData['form_name'],
      formData['form_desc'],
      parseFields(formData['fields']));
};

const parseFields = (fieldsData) => {
  return fieldsData.map((field) =>
    new Field(field['field_type'], field['field_name']));
};

/** Class representing a form. */
class Form {
  /**
   * @constructor
   * @param {string} formName The name of the form to be displayed.
   * @param {string} formDesc The descrition of the form.
   * @param {string} fields The fields of the form.
   */
  constructor(formName, formDesc, fields) {
    this.formName = formName;
    this.formDesc = formDesc;
    this.fields = fields;
  }

  /**
   * Calculates the number of fields the form has
   * @return {number} how many fields the form contains
   */
  numFields() {
    return this.fields.length;
  }
}

/** Class representing a field of a form */
class Field {
  /**
   * @constructor
   * @param {string} fieldType The type of field (e.g. text, email, radio, etc)
   * @param {string} fieldName The name of the field
   */
  constructor(fieldType, fieldName) {
    this.fieldType = fieldType;
    this.fieldName = fieldName;
  }
}

module.exports = {loginPost, formPost, getFormData, parseFormData};
