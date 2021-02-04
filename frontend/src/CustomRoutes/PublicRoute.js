
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isLogin} from '../utils';
import PropTypes from 'prop-types';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
  return (
    <Route {...rest} render={ (props) => (
          isLogin() && restricted ?
            <Redirect to='/home' /> :
              <Component {...props} />
    )} />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.func,
  restricted: PropTypes.bool,
};

export default PublicRoute;
