import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import authentication from '../../stores/Authentication';

const PrivateRoute = (props: RouteProps) => {
  return authentication.isAuthenticated ? (<Route {...props}/>) : (<Redirect to="login"/>);
};

export default PrivateRoute;