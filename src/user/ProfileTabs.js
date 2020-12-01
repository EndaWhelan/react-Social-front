import React, { Component } from 'react'

import DefaultProfile from '../Images/avatar.png'
import { Link } from 'react-router-dom'

class ProfileTabs extends Component {
    render() {
        const { following, followers, posts} = this.props
        return (
            <>
                <div className="row">
                    <div className="col-md-4">
                        <h3 className="text-primary">Followers</h3>
                        <hr />
                        {followers.map((person, i ) => (
                            <div key={i}>
                                <Link to={`/user/${person._id}`}>
                                    <img src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}?${new Date().getTime()}`} alt={person.name} onError={i => (i.target.src = `${DefaultProfile}`)}
                                    className="rounded-circle mr-2 float-left border border-dark" 
                                    height="35"
                                    width="35"
                                    />
                                    <div>
                                        <p className="lead">{person.name}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-primary">Following</h3>
                        <hr />
                        {following.map((person, i ) => (
                            <div key={i}>
                                <Link to={`/user/${person._id}`}>
                                    <img src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}?${new Date().getTime()}`} alt={person.name} onError={i => (i.target.src = `${DefaultProfile}`)}
                                    className="rounded-circle mr-2 float-left border border-dark" 
                                    height="35"
                                    width="35"
                                    />
                                    <div>
                                        <p className="lead">{person.name}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-primary">Posts</h3>
                        <hr />
                        {posts.map((post, i ) => (
                            <div key={i}>
                                <Link to={`/post/${post._id}`}>
                                    <div>
                                        <p className="lead">{post.title}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
    }
}

export default ProfileTabs