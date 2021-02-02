import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {TextField, Button, Container} from '@material-ui/core';

/** Class Component for Registration Page */
class Registration extends Component {
  /**
   * @constructor
   * @param {object} props - Passed in props
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordError: null,
      emailError: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEntries = this.validateEntries.bind(this);
  }

  /**
   * Updates the state with the changed component information
   * @param {event} event - Event which occurred
   */
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  /** Handles registration attempt */
  async handleSubmit() {
    if (this.validateEntries()) {
      alert(`User registered: \n${this.state.username}
      \n${this.state.email}`);
    }
  }

  /** Stub for when database is implemented to do validation/registration */
  async registerUser() {

  }

  /** Checks to make sure passwords match
  * @return {boolean} - Returns true if passwords match, false otherwise
  */
  validateEntries() {
    let validated = true;
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({passwordError: 'Passwords do not match'});
      validated = false;
    } else {
      this.setState({passwordError: null});
    }
    if (!(this.state.email.includes('@') && this.state.email.includes('.'))) {
      this.setState({emailError: 'Invalid email'});
      validated = false;
    } else {
      this.setState({emailError: null});
    }
    return validated;
  }

  /**
   * Renders the registration form
   * @return {Container} - Returns the rendered registration form
   */
  render() {
    return (
      <Container maxWidth='xs'>
        <Container maxWidth='sm'>
          <h2>CloudHaven Registration</h2>
        </Container>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="username"
          label="Username"
          onChange={this.handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="email"
          label="Email"
          error={this.state.emailError ? true : false}
          helperText={this.state.emailError ? this.state.emailError : null}
          onChange={this.handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          error={this.state.passwordError ? true : false}
          helperText={this.state.passwordError ?
              this.state.passwordError : null}
          onChange={this.handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          error={this.state.passwordError ? true : false}
          helperText={this.state.passwordError ?
              this.state.passwordError : null}
          onChange={this.handleChange}
        />
        <Button
          onClick={this.handleSubmit}
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign Up
        </Button>
        <p className="message">
          Already have an account?
          <Link to="/login"> Sign In</Link>
        </p>
      </Container>
    );
  }
};

Registration.propTypes = {
  showLanding: PropTypes.func,
};

export default withRouter(Registration);
