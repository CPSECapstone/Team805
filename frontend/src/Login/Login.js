import React, {useState} from 'react';
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
        }, {
          withCredentials: true,
        })
        .catch( (err) => console.log('error in logging in'))
        .then((res) => {
          if (res.data['status'] == 'success') {
            // create a cookie that stores the username for 1 hour
            setCookie('LoggedInUser', loginUsername, 60);
            window.location.href = '/';
          }
        });
  };
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
};

export default Login;
