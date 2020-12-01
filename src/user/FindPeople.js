import React, { Component } from 'react'
import { findPeople, follow } from './apiUser'

import DefaultProfile from '../Images/avatar.png'
import { Link } from 'react-router-dom'
import { isAuth } from '../Auth'

class FindPeople extends Component {
    constructor(){
        super()
        this.state = {
            users: [],
            error: '',
            open: false
        }
    }

    componentDidMount() {
        const userId = isAuth().user._id
        const token = isAuth().token

        findPeople(userId,token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({users: data})
            }
        })
    }

    clickToFollow = (user, index) => {
        const userId = isAuth().user._id
        const token = isAuth().token

        follow(userId,token, user._id)
        .then(data => {
            if(data.error) {
                this.setState({error: data.error})
            } else {
                let toFollow = this.state.users
                toFollow.splice(index, 1)
                this.setState({users: toFollow, open: true, followMessage: `Following ${user.name}`})
            }
        })
    }

    renderUsers = users => (
        <div className="row">
            {users.map((userItem, i) => (
                <div key={i} className="card col-md-4" >
                    <img style={{ height: "200px", width: "auto"}} className="img-thumbnail" src={`${process.env.REACT_APP_API_URL}/user/photo/${userItem._id}?${new Date().getTime()}`} onError={i => (i.target.src = `${DefaultProfile}`)} alt={userItem.name} />
                        <div className="card-body">
                        <h5 className="card-title">{userItem.name}</h5>
                        <p className="card-text">{userItem.email}</p>
                        <Link className="btn btn-raised btn-small btn-primary" to={`/user/${userItem._id}`}>View Profile</Link>
                        <button onClick={() => this.clickToFollow(userItem, i)} className="btn btn-raised btn-info float-right btn-small">
                            Follow
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const {users, open, followMessage} = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Find Dancers</h2>

                {open && (
                    <div className="alert alert-success">
                        <p>{followMessage}</p>
                    </div>
                )}
                
                {this.renderUsers(users)}
            </div>
        );
    }
}

export default FindPeople;