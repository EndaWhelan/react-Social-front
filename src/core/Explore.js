import React, { Component } from 'react';

import Posts from '../post/Posts'

class Explore extends Component {

    render() {
        return(
            <>
            <div className="jumbotron">
                <h2>Home</h2>
                <p className="lead">Welcome to React Frontend</p>
            </div>

            <div className="container">
                <Posts />
            </div>

            </>
        );
    }

}

export default Explore;