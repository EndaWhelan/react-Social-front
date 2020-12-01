import React, { Component } from 'react'

import DefaultPost from '../Images/postDefault.jpg'
import { Link } from 'react-router-dom'
import { list } from './apiPosts'

class Posts extends Component {
    constructor(){
        super()
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        list().then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({posts: data})
            }
        })
    }

    renderPosts = posts => {
        return (
            <div className="row">
                {posts.map((post, i) => {

                    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : ''
                    const posterName = post.postedBy ? post.postedBy.name : ' Unknown'

                    return(
                        <div key={i} className="card col-md-3" >
                            <div className="card-body">
                            <img style={{ height: "200px", width: "100%"}} className="img-thumbnail mb-3" src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}?${new Date().getTime()}`} onError={i => (i.target.src = `${DefaultPost}`)} alt={post.title} />
                                <h5 className="card-title">{post.title.substring(0, 20)}</h5>
                                <p className="card-text">{post.body.substring(0, 100)}</p>
                                <br />
                                <p className="font-italic mark">
                                    Posted By <Link to={`${posterId}`}>{posterName} </Link>
                                    on {new Date(post.created).toDateString()}
                                </p>
                                <Link className="btn btn-raised btn-small btn-primary" to={`/post/${post._id}`}>Read More</Link>
                            </div>
                        </div>
                    )
                
                })}
            </div>
        )
    };

    render() {
        const {posts} = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">
                    {!posts.length ? "Loading ... ": "Posts"}
                </h2>
                {this.renderPosts(posts)}
            </div>
        );
    }
}

export default Posts;