import React, { Component } from 'react'

import DefaultProfile from '../Images/avatar.png'
import { Link } from 'react-router-dom'
import { list } from './apiUser'

class Users extends Component {
    constructor(){
        super()
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        list().then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({users: data})
            }
        })
    }

    renderUsers = users => (
        <div className="row">
            {users.map((userItem, i) => (
                <div key={i} className="card col-md-3" >
                    <img style={{ height: "200px", width: "auto"}} className="img-thumbnail" src={`${process.env.REACT_APP_API_URL}/user/photo/${userItem._id}?${new Date().getTime()}`} onError={i => (i.target.src = `${DefaultProfile}`)} alt={userItem.name} />
                        <div className="card-body">
                        <h5 className="card-title">{userItem.name}</h5>
                        <p className="card-text">{userItem.email}</p>
                        <Link className="btn btn-raised btn-small btn-primary" to={`/user/${userItem._id}`}>View Profile</Link>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const {users} = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Users</h2>
                {this.renderUsers(users)}
            </div>
        );
    }
}

export default Users;