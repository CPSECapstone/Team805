const axios = require('axios');

const loginPost = async (userToken, passToken) => {
  return axios.post('http://localhost:5000/login',
      {
        username: userToken,
        password: passToken,
      })
      .then((response) => {
        console.log(response.status);
        console.log('User ' + userToken + ' successfully logged in.');
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
  return new Form(formData['form_name'], formData['form_desc'],
      parseFields(formData['fields']));
};

const parseFields = (fieldsData) => {
  return fieldsData.map((field) => new Field(field['field_type'],
      field['field_name']));
};

/** Form object created from JSON form response */
class Form {
  /**
   * Creates a form object
   * @param {string} formName - the name of the form
   * @param {string} formDesc - a short description of the form
   * @param {Field[]} fields - an array of Field objects
   */
  constructor(formName, formDesc, fields) {
    this.formName = formName;
    this.formDesc = formDesc;
    this.fields = fields;
  }

  /**
   * Returns the number of fields in a form
   * @return {number} - length of fields array attribute
   */
  numFields() {
    return this.fields.length;
  }
}

/** Field object representing a single field in a Form */
class Field {
  /**
   * Creates a field object
   * @param {string} fieldType - type of form element
   * @param {string} fieldName - name of the field
   */
  constructor(fieldType, fieldName) {
    this.fieldType = fieldType;
    this.fieldName = fieldName;
  }
}

module.exports = {loginPost, getFormData, parseFormData};
