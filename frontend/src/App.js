import React, { Component } from 'react';
import Form from './components/Form';
import { Button } from '@material-ui/core';
import './App.css';

class App extends Component {
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
          <p>CloudHaven Sample Form Flow</p>
          <Button variant="contained" onClick={this.sampleFlow}>Login</Button> 
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <p>CloudHaven Sample Form Flow</p>
          <Form formData={this.state.formData} /> 
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

export default App;
