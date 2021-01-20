import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form from './Forms/Form';
import {Button} from '@material-ui/core';
import './App.css';

/** Main App Component */
class App extends Component {
  /**
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      formData: null,
    };

    this.sampleFlow = this.sampleFlow.bind(this);
  }

  /**
   * Renders App based on state information
   * @return {div} - Returns the fully rendered React app
   */
  render() {
    if (!this.state.formData) {
      return (
        <div className="App">
          <p>CloudHaven Sample Form Flow</p>
          <Button variant="contained" onClick={this.sampleFlow}>Login</Button>
        </div>
      );
    } else {
      return (
        <div className="App">
          <p>CloudHaven Sample Form Flow</p>
          <Form config={this.state.formData} formPost={this.props.formPost} />
        </div>
      );
    }
  }

  /**
   * Runs through basic flow and sets state accordingly
   */
  async sampleFlow() {
    let res = await this.props.loginPost('testUser', 'testPass');
    if (res !== 200) {
      console.log('login failed');
      return;
    }
    res = await this.props.getFormData();
    if (res.status !== 200) {
      console.log('get form data failed');
      return;
    }
    this.setState({formData: res.data});
  }
}

App.propTypes = {
  loginPost: PropTypes.func,
  getFormData: PropTypes.func,
  formPost: PropTypes.func,
};

export default App;
