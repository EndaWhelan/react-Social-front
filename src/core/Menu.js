/* eslint-disable jsx-a11y/anchor-is-valid */

import {Link, withRouter} from 'react-router-dom'
import React ,{Component} from 'react'
import { isAuth, logout } from '../Auth'

import DefaultProfile from '../Images/avatar.png'

class Menu extends Component {

    isActive = (history, path) => {
        if(history.location.pathname === path) return "nav-link active"
        else return "nav-link"
    }

    render() {
        const { history } = this.props
        
        const photoUrl = isAuth() ? `${process.env.REACT_APP_API_URL}/user/photo/${isAuth().user._id}?${new Date().getTime()}` : DefaultProfile;

        return (
            
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                    <div className="navbar-brand"><img src={process.env.PUBLIC_URL + '/assets/AODLogoTest.png'} alt='The Academy of Dance' /></div>
                    {isAuth() && (
                        <>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMenu" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </>
                    )}
                    <div className="collapse navbar-collapse ml-auto" id="navbarMenu" >
                        <ul className="navbar-nav mr-auto">
                        {isAuth() && (
                            <>
                            <li className="nav-item">
                                <Link className={this.isActive(history, "/explore")}  to="/explore">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={this.isActive(history, "/users")}  to="/users">Users</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={this.isActive(history, "/findpeople")}  to="/findpeople">Find Dancers</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={this.isActive(history, "/post/create")}  to="/post/create">Create Post</Link>
                            </li>
                            </>
                            )}
                            {!isAuth() && (
                                <>
                                    <li className="nav-item">
                                        <Link className={this.isActive(history, "/signin")} to="/signin">Sign In</Link>
                                    </li>
                                    {/* <li className="nav-item">
                                        <Link className={isActive(history, "/signup")} to="/signup">Register</Link>
                                    </li> */}
                                </>
                            )}
                            
                        </ul>
            
                        <div className="navbar-nav ml-auto">
                        {isAuth() && (
                            <>
                            <li className="nav-item d-lg-none d-xl-none">
                                <Link className={this.isActive(history, `/user/${isAuth().user._id}`)} to={`/user/${isAuth().user._id}`} >My Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={this.isActive(history, "/signout")} to="/signin" onClick={()=> logout()}>Log Out</Link>
                            </li>
                            
            
            
            
            
                            <li className="nav-item avatar ml-3 d-none d-lg-block">
                                <Link className="nav-link p-0" to={`/user/${isAuth().user._id}`} >
                                <img
                                            src={photoUrl}
                                            className="rounded-circle z-depth-0" 
                                            alt="avatar"
                                            height="35"
                                            width="35"
                                            onError={i => (i.target.src = `${DefaultProfile}`)}
                                        />
            
                                </Link>
                            </li>
                 
            
                            </>
                        )}
                        </div>
            
                    </div>
                </nav>
            
        )
    }

}

export default withRouter(Menu);