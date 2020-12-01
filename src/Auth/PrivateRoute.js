/* eslint-disable no-unused-expressions */

import { Redirect, Route } from 'react-router-dom'

import React from 'react'
import { isAuth } from './index'

const PrivateRoute = ({component: Component, ...rest}) => (
    // props means component passed down to this private route component
    <Route 
        {...rest} 
        render={props => isAuth() ? (
            <Component {...props} />
        ) : (
        <Redirect 
            to={{ 
                pathname: "/signin", 
                state: { from: props.location }
        }} 
    />
    )
    } />
)

export default PrivateRoute;