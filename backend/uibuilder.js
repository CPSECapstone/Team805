const fakeJson = {
	"form_name": "name", 
	"form_desc": "desc",
	"fields": [{"field_type": "radio", "field_name": "radio1"},
              {"field_type": "text_input", "field_name": "first_name"},
              {"field_type": "text_input", "field_name": "last_name"},
              {"field_type": "email_text_input", "field_name": "email"}]
}

const getFormData = async() => {
  const response = await fetch('http://localhost:3000/formData');
  const myJson = await response.json();
  return myJson;
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

console.log(parseFormData(fakeJson));