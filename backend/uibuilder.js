const getFormData = async() => {
  const response = await fetch('http://localhost:5000/form');
  return await response.json();
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