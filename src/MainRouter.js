import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './auth/PrivateRoute';
import Home from './core/Home';
import Menu from './core/Menu';
import Signup from './users/Signup';
import Users from './users/Users';
import Signin from './auth/Signin';
import Profile from './users/Profile';
import EditProfile from './users/EditProfile';

const MainRouter = () => {
  return (
    <>
      <Menu />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={Users} />
        <Route exact path='/user/:userId' component={Profile} />
        <PrivateRoute exact path='/user/edit/:userId' component={EditProfile} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/signin' component={Signin} />
      </Switch>
    </>
  );
};

export default MainRouter;
