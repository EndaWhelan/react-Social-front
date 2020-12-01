import { Redirect, Route, Switch } from 'react-router-dom';

import EditPost from './post/EditPost'
import EditProfile from './user/EditProfile'
import Explore from './core/Explore'
import FindPeople from './user/FindPeople'
import Menu from './core/Menu'
import NewPost from './post/NewPost'
import PrivateRoute from './Auth/PrivateRoute'
import Profile from './user/Profile'
import React from 'react';
import Signin from './user/Signin'
import Signup from './user/Signup'
import SinglePost from './post/SinglePost'
import Users from './user/Users'

const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path="/"><Redirect to="/explore" /></Route>
            <PrivateRoute exact path="/explore" component={Explore} />
            <PrivateRoute exact path="/post/create" component={NewPost} />
            <PrivateRoute exact path="/findpeople" component={FindPeople} />
            <PrivateRoute exact path="/users" component={Users} />
            <PrivateRoute exact path="/post/:postId" component={SinglePost} />
            <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <PrivateRoute exact path="/user/:userId" component={Profile} />
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
            
        </Switch>
    </div>
);

export default MainRouter;