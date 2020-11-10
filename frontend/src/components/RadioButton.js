import React from 'react'
import { Radio, 
  RadioGroup, 
  FormLabel,
  FormControlLabel} from '@material-ui/core';

function RadioButton(props) {
  const [value, setValue] = React.useState('Option 1');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="RadioButton">
      <FormLabel component="legend">{props.label}</FormLabel>
      <RadioGroup name={props.name} value={value} onChange={handleChange}>
        <FormControlLabel value="Option 1" control={<Radio />} name="option1" label="Option 1"/>
        <FormControlLabel value="Option 2" control={<Radio />} name="option2" label="Option 2"/>
        <FormControlLabel value="Option 3" control={<Radio />} name="option3" label="Option 3"/>
      </RadioGroup>
    </div>
  );
}

export default RadioButton;
