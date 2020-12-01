import { Link, Redirect } from 'react-router-dom';
import React , { Component } from 'react';

import DefaultProfile from '../Images/avatar.png'
import  DeleteUser from './DeleteUser'
import FollowProfileButton from './FollowButtonProfile'
import ProfileTabs from './ProfileTabs'
import Users from './Users';
import { isAuth } from '../Auth'
import { listByUser } from '../post/apiPosts'
import {read} from './apiUser'

class Profile extends Component {

    _isMounted = false;
    
    constructor(){
        super()
        this.state = {
            user: { following: [], followers: []},
            redirectToSignin: false,
            following: false,
            error: '',
            posts: []
        }
    }

    // check follwing
    checkFollow = user => {
        const jwt = isAuth()
        const match = user.followers.find(follower => {
            return follower._id === jwt.user._id
        })
        return match;
    }

    clickFollowButton = callApi => {
        const userId = isAuth().user._id
        const token = isAuth().token

        callApi(userId,token, this.state.user._id)
        .then(data=>{
            if(data.error){
                this.setState({error: data.error})
            } else {
                this.setState({user: data, following: !this.state.following})
            }
        })
    }


    init = userId => {
        const token = isAuth().token
        
        read(userId, token )
        .then(data => {
            if(data.error) {
                this.setState({redirectToSignin : true})
            } else {
                if(this._isMounted === true) {
                    let following = this.checkFollow(data)
                    this.setState({user: data, following});
                    this.loadPosts(data._id)
                }
                
            }
        })
    }
    
    loadPosts = userId => {
        const token = isAuth().token
        
        listByUser(userId, token )
        .then(data => {
            if(data.error) {
                this.setState({redirectToSignin : true})
            } else {
                if(this._isMounted === true) {
                    this.setState({posts: data});
                }
                
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    componentDidMount() {
        this._isMounted = true;
        const userId = this.props.match.params.userId;
        this.init(userId)
    }

    componentDidUpdate(prevProps) {

        const userId = this.props.match.params.userId;
        if(userId !== prevProps.match.params.userId) this.init(userId)
    }
    
    

    render() {

        const {redirectToSignin, user, following, posts} = this.state

        if(redirectToSignin) {
            return <Redirect exact to="/signin" />
        }
        const photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` : DefaultProfile;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">
                    <div className="col-md-4">
                        <img style={{ height: "200px", width: "auto"}} className="img-thumbnail" src={photoUrl} onError={i => (i.target.src = `${DefaultProfile}`)} alt={Users.name} />
                     </div>
                    <div className="col-md-8">
                        <div className="lead mt-2">
                            <p>Hello {user.name}</p>
                            <p>email:  {user.email}</p>
                            {user.about !== undefined || user.about !== "" ? <><hr /><p>{`About Me:  ${user.about}`}</p></>: ''}
                        </div> 
                        {isAuth().user && isAuth().user._id === user._id ? (
                            <div className="d-inline-block">
                                <Link className="btn btn-raised btn-info mr-5" to={`/post/create`}>Create Post</Link>
                                <Link className="btn btn-raised btn-success mr-5" to={`/user/edit/${user._id}`}>Edit Profile</Link>
                                <DeleteUser userId={user._id} />
                            </div>
                            
                        ) : (<FollowProfileButton following={following} onButtonClick={this.clickFollowButton} />)}

                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    <hr />
                        <ProfileTabs followers={user.followers}  following={user.following} posts={posts}/>                      
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;