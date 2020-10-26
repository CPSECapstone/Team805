import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '25ch',
    },
  },
}));

function App() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField required id="standard-required" label="First Name" />
        <TextField required id="standard-required" label="Last Name" />
        <TextField required id="standard-required" label="Email" type="email" />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          color="secondary"
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="First Name"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Last Name"
          variant="outlined"
        />
         <TextField
          required
          id="outlined-required"
          label="Email"
          type="email"
          variant="outlined"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
        />
      </div>
    </form>
  );
}


export default App;
