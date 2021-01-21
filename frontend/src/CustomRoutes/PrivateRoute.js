
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isLogin} from '../utils';
import PropTypes from 'prop-types';

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={ (props) => (
          isLogin() ?
              <Component {...props} /> :
              <Redirect to='/login' />
    )} />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
};

export default PrivateRoute;
