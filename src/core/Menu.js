import {Link, withRouter} from 'react-router-dom'

import React from 'react'

const isActive = (history, path) => {
    if(history.location.pathname === path) return "nav-link active"
    else return "nav-link"
}

const logout = () =>{
    if(typeof window !== 'undefined') localStorage.removeItem('jwt')
    return fetch("http://localhost:8081/signout", {
        method: "GET"
    }).then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
}


const Menu = ({history}) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMenu" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse ml-auto" id="navbarMenu" >
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className={isActive(history, "/")}  to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className={isActive(history, "/signin")} to="/signin">Sign In</Link>
                </li>
                <li className="nav-item">
                    <Link className={isActive(history, "/signup")} to="/signup">Register</Link>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className={isActive(history, "/signout")} to="/signin" onClick={()=> logout()}>Log Out</Link>
                </li>
            </ul>
        </div>
    </nav>
);


export default withRouter(Menu);