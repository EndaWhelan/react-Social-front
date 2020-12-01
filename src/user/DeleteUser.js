import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { isAuth } from '../Auth'
import { logout } from '../Auth'
import { remove } from './apiUser'

class DeleteUser extends Component {

    state = {
        redirect: false
    };

    deleteAccount = () => {
        const token = isAuth().token
        const userId = this.props.userId

        remove(userId, token)
        .then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                //signout user
                logout(() => console.log('User Deleted') );
                // redirect
                this.setState({redirect: true});
            }
        })
    }
    deleteConfirm = () => {
        let answer = window.confirm("are you sure you want to delete your account??")
        if(answer) {
            this.deleteAccount();
        }
    }
    render() {
        if(this.state.redirect) return <Redirect to="/signin" />
        return (
            <Button className="btn btn-raised btn-danger" onClick={this.deleteConfirm}>Delete Profile</Button>
        )
    }
}

export default DeleteUser;