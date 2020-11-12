import React, { Component } from 'react'
import { TextField, FormLabel, Box, Button } from '@material-ui/core';
import RadioButton from './RadioButton';
import '../App.css'

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }

    this.handleChange = this.handleChange.bind(this);
  }

  formComponents = {
    TextField: TextField,
    RadioButton: RadioButton
  };

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  submitForm = async () => {
    alert(`A form was submitted: \n${this.state.firstName}\n${this.state.lastName}
    ${this.state.email}\n${this.state.password}\n${this.state.gender}`);
  }

  render () {
    console.log(this.state);
    const formData = this.props.formData;
    const fields = formData.fields.map(field => {
      const Component = this.formComponents[field.component];
      return (
        <Component className="Field" key={field.name} {...field} onChange={this.handleChange}/>
      );
    });
    return (
    <form className="Form">
      <h1 className="FormTitle">{formData.form_name}</h1>
      <FormLabel className="FormDesc" component="legend">{formData.form_desc}</FormLabel>
      <div className="Fields">
        {fields}
      </div>
      <Box mt={2}>
        <Button variant="contained" onClick={this.submitForm}>Submit</Button> 
      </Box>
    </form>
    )
  }
}

export default Form;
