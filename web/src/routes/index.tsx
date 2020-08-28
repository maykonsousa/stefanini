import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Profiles from '../pages/Profiles';
import Functionalities from '../pages/Functionalities';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/users" component={Users} isPrivate />
      <Route path="/profiles" component={Profiles} isPrivate />
      <Route path="/functionalities" component={Functionalities} isPrivate />
    </Switch>
  );
};

export default Routes;
