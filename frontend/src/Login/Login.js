import React, {useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './Login.css';

export const login = (username, password, stateSetter) => {
  if (!username || !password) {
    alert('username and password required!');
    return;
  }
  axios.post('/login', {
    username: username,
    password: password,
  })
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem('loggedIn', 'yup');
          window.location.assign('/home');
        } else {
          console.log('login fail');
        }
      })
      .catch((err) => stateSetter(true));
};

/**
 *
 * @return {*}
 */
const Login = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <Container component='div' maxWidth='xs'>
      <Container component='div' maxWidth='sm'>
        <h2 className = 'Title'>CloudHaven Login</h2>
      </Container>
      <form className= 'LoginForm' onSubmit= {login}>
        {errorMessage ?
        <TextField
          error
          helperText = "Incorrect username or password."
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="user"
          onChange={(e) => setLoginUsername(e.target.value)}/> :
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="user"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        }
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Passord"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={()=>
            login(loginUsername, loginPassword, setErrorMessage)}>
          Sign In
        </Button>
        <p className="message">
          New to Cloudhaven?
          <Link to="/register"> Register</Link>
        </p>
      </form>
    </Container>
  );
};

export default withRouter(Login);
