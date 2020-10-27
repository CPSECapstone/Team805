import TextField from '@material-ui/core/TextField';
import React from 'react';

const InputField = ({ ...props }) => (
  <div>
    <TextField {...props} />
  </div>
);

export default InputField;
