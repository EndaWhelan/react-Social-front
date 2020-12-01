import React, { Component } from 'react'
import { like, remove, singlePost, unlike } from './apiPosts'

import Comment from './Comment'
import DefaultPost from '../Images/postDefault.jpg'
import { Link } from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import { isAuth } from '../Auth'

class SinglePost extends Component {
    state = {
        post: "",
        error: "",
        redirectToHome: false,
        redirectToSignIn: false,
        liked: false,
        likes: 0,
        comments: []
    }

    checkLikes = (likes) => {
        const userId = isAuth() && isAuth().user._id
        return likes.indexOf(userId) !== -1
    }
    componentDidMount = () => {
        const postId = this.props.match.params.postId
        singlePost(postId)
        .then(data => {
            if(data.error){
                this.setState({error: data.error})
            } else {
                this.setState({post: data, likes: data.likes.length, liked: this.checkLikes(data.likes),  comments: data.comments })
            }
        })
    }

    deletePost = () => {
        const postId = this.props.match.params.postId
        const token = isAuth().token

        remove(postId, token)
        .then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                this.setState({redirectToHome: true})
            }
        })

    }

    deleteConfirm = () => {
        let answer = window.confirm("are you sure you want to delete post??")
        if(answer) {
            this.deletePost();
        }
    }

    likeToggle = () => {
        if(!isAuth()){
            this.setState({ redirectToSignIn: true})
            return false;
        }
        const {liked, post} = this.state
        let callApi = liked ? unlike : like
        const userId = isAuth().user._id
        const postId = post._id
        const token = isAuth().token

        callApi(userId,token,postId)
        .then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                this.setState({
                    liked: !liked,
                    likes: data.likes.length
                })
                
            }
        })
    }

    renderPost = post =>{
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : ''
        const posterName = post.postedBy ? post.postedBy.name : ' Unknown'

        const {likes, liked} = this.state
        return(
                <div className="card-body">
                    <img style={{ height: "300px", width: "100%", objectFit: "cover"}} className="img-thumbnail mb-3" src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}?${new Date().getTime()}`} onError={i => (i.target.src = `${DefaultPost}`)} alt={post.title} />
                    {liked 
                        ? 
                            <h3 onClick={this.likeToggle}>{likes}  <i className="fa fa-thumbs-up text-success"></i></h3>
                        :
                            <h3 onClick={this.likeToggle}>{likes} <i className="fa fa-thumbs-up text-muted"></i></h3>
                    }
                    <div className="card-text wordWrap" >{post.title}</div>
                    <hr />
                    <div className="card-text wordWrap" >{post.body}</div>
                    <hr />
                    <p className="font-italic mark">
                        Posted By <Link to={`${posterId}`}>{posterName} </Link>
                        on {new Date(post.created).toDateString()}
                    </p>
                    <div className="d-inline-block">

                        <Link className="btn btn-raised btn-small btn-primary mr-5" to={`/`}>back to posts</Link>
                        {isAuth().user && isAuth().user._id === post.postedBy._id && 
                        <>
                            <Link className="btn btn-raised btn-small btn-warning mr-5" to={`/post/edit/${post._id}`}>Edit Post</Link>
                            <button className="btn btn-raised btn-small btn-danger" onClick={this.deleteConfirm}>Delete Post</button>
                        </>
                        }
                    </div>
                </div>

        );
    }

    updateCommments = comments => {
        this.setState({comments})
    }

    render() {

        const { post , redirectToHome, redirectToSignIn, comments} = this.state

        if(redirectToSignIn) {
            return <Redirect exact to="/signin" />
        }

        if(redirectToHome) {
            return <Redirect exact to="/" />
        }

        return (
            <div className="container">               
                {!post ? <div className="jumbotron text-center"><h2>Loading...</h2></div>: this.renderPost(post)}
                <Comment postId={post._id} singlePostcomments={comments.reverse()} updateCommments={this.updateCommments}/>
            </div>
        );
    }
}

export default SinglePost