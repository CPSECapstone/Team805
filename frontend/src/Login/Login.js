import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './Login.css';
import {Redirect} from 'react-router-dom';

/**
 *
 * @return {*}
 */
const Login = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loggedIn] = useState(false);

  const login = () => {
    console.log(loginUsername, ' ', loginPassword);
    axios.post('http://localhost:3001/login',
        {
          username: loginUsername,
          password: loginPassword,
        })
        .then((res) => console.log('response was ', res))
        .then(function(response) {
          console.log('got down here somehow');
          if (response.data.redirect == '/') {
            window.location = '/';
          } else if (response.data.redirect == '/login') {
            window.location = '/login';
          }
        });
  };

  console.log(loggedIn);

  if (!loggedIn) {
    return (
      <Container component='div' maxWidth='xs'>
        <Container component='div' maxWidth='sm'>
          <h2 className = 'Title'>CloudHaven Login</h2>
        </Container>
        <form className= 'LoginForm' onSubmit= {login}>
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
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        </form>
      </Container>
    );
  } else {
    return (
      <Redirect to='/' />
    );
  }
};

export default Login;
