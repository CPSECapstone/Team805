import React, { Component } from 'react'
import { TextField, FormLabel } from '@material-ui/core';
import RadioButton from './RadioButton';
import '../App.css'

class Form extends Component {
  formComponents = {
    text_input: TextField,
    email_text_input: TextField,
    radio: RadioButton 
  };

  render () {
    const formData = this.props.formData;
    const fields = formData.fields.map(field => {
      const Component = this.formComponents[field.field_type];
      return (
        <Component className="Field" key={field.label} {...field} />
      );
    });
    return (
    <form className="Form">
      <h1 className="FormTitle">{formData.form_name}</h1>
      <FormLabel className="FormDesc" component="legend">{formData.form_desc}</FormLabel>
      <div className="Fields">
        {fields}
      </div>
    </form>
    )
  }
}

export default Form;
