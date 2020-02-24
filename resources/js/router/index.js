import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from '../views/index';
import Admin from '../views/Admin';
import User from '../views/User';
import Login from '../views/Login';
import Register from '../views/Login/Register';

import NotFound from '../views/404';

// User is LoggedIn
import AdminRoute from "./Admin";
import UserRoute from "./User";

const Main = props => (
    <Switch>
        {/*User might LogIn*/}
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        {/* User is LoggedIn*/}
        <AdminRoute path="/admin" component={Admin} />
        <UserRoute path="/user" component={User} />

        {/*Page Not Found*/}
        <Route component={NotFound} />
    </Switch>
);

export default Main;
