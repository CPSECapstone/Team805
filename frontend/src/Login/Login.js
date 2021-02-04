import React, {useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './Login.css';

/**
 *
 * @return {*}
 */
const Login = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // expire time is in minutes
  const setCookie = (key, value, expTime) => {
    const date = new Date();
    date.setTime(date.getTime() + (expTime * 10 * 6000));
    const expires = '; expires=' + date.toUTC;
    document.cookie = key + '=' + (value || '') + expires + '; path=/';
  };

  const login = () => {
    axios.post('http://localhost:3001/login',
        {
          username: loginUsername,
          password: loginPassword,
        })
        .catch( (err) => console.log('error in logging in', err) )
        .then((res) => {
          // change this if you change the response from login post
          // for ex if you want to store id instead, you should gather it here
          if (res.data['status'] == 'success') {
            // create a cookie that stores the username for 1 hour
            console.log('login sucess');
            setCookie('LoggedInUser', loginUsername, 60);
            window.location.href = '/home';
          } else {
            console.log('login fail');
          }
        });
  };

  return (
    <Container component='div' maxWidth='xs'>
      <Container component='div' maxWidth='sm'>
        <h2 className = 'Title'>CloudHaven Login</h2>
      </Container>
      <form className= 'LoginForm'>
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
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={login}>
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
