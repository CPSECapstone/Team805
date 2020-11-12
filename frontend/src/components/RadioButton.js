import React, { Component } from 'react'
import { Radio, 
  RadioGroup, 
  FormLabel,
  FormControlLabel} from '@material-ui/core';

class RadioButton extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: "Option 1",
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.onChange(event);
  }

  render () {
    return (
      <div className="RadioButton">
        <FormLabel component="legend">{this.props.label}</FormLabel>
        <RadioGroup name={this.props.name} value={this.state.value} onChange={this.handleChange}>
          <FormControlLabel value="male" control={<Radio />} name="gender" label="Male"/>
          <FormControlLabel value="female" control={<Radio />} name="gender" label="Female"/>
          <FormControlLabel value="other" control={<Radio />} name="gender" label="Other"/>
        </RadioGroup>
      </div>
    );
  }
}

export default RadioButton;
