import './App.css';
import React, { Fragment } from 'react';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      formData: null
    }
  }

  render () {
    if (!this.state.formData) {
      return (
        <div className="App">
          <button onClick={this.sampleFlow}>login</button>
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <Form form={this.state.formData}/>
        </div>
      );
    }
  }

  sampleFlow = async () => {
    var res = await this.props.loginPost("testUser", "testPass");
    if (res !== 200) {
      console.log("login failed")
      return;
    }
    res = await this.props.getFormData();
    if (res.status !== 200) {
      console.log("get form data failed")
      return;
    }
    this.setState({formData: res.data});
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Form">
        <p>{this.props.form['form_name']}</p> 
      </div>
    );
  }
}

class Field extends React.Component {
  constructor(fieldType, fieldName, props) {
    super(props)
    this.fieldType = fieldType;
    this.fieldName = fieldName;
    this.state = {
      fieldValue: "jo mama"
    }
  }
  
  render() {
    return (
      <div>
        {this.state.fieldValue}
      </div>
    )
  }
}
