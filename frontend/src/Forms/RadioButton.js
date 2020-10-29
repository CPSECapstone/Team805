import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';

// labels are hard coded for right now
const RadioButton = ({...props}) => (
  <div>
    <RadioGroup {...props} >
      <FormControlLabel value="female" control={<Radio />} label="Female" />
      <FormControlLabel value="male" control={<Radio />} label="Male" />
      <FormControlLabel value="nonBinary" control={<Radio />}
        label="Non-Binary" />
    </RadioGroup>
  </div>
);

export default RadioButton;
