import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Renderer} from './Renderer';

/** Class Component for Forms */
class Form extends Component {
  /**
   * @constructor
   * @param {object} props - Passed in form information
   */
  constructor(props) {
    super(props);
    this.state = {
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Updates the state with the component information
   * @param {event} event - Event which occurred
   */
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    console.log(this.state);
  }

  /** Handles form submission */
  async handleSubmit() {
    alert(`A form was submitted: \n${this.state.firstName}
      ${this.state.lastName}\n${this.state.email}
      ${this.state.password}\n${this.state.gender}`);
  }

  /**
   * Renders form using Renderer to generate components
   * @return {Grid} - Returns the rendered form
   */
  render() {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12}>
          <form>
            <Renderer config={this.props.config}
              handleOnChange={this.handleChange}/>
            <Button type="submit" onClick={this.handleSubmit}
              variant="contained">Submit</Button>
          </form>
        </Grid>

      </Grid>
    );
  }
};

Form.propTypes = {
  config: PropTypes.object,
};

export default Form;
