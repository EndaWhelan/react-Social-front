import React, { Component } from 'react'
import { comment, uncomment } from './apiPosts'

import DefaultProfile from '../Images/avatar.png'
import { Link } from 'react-router-dom'
import { isAuth } from '../Auth'

class Comment extends Component {

    state = {
        text: '',
        error: ''
    }

    handleChange = event => {
        this.setState({ error: '', text: event.target.value })
    }

    isValid = () => {
        const {text} = this.state
        if(text.length <= 0 || text.length > 150){
            this.setState({error: 'Comment should not be empty and less than 150 characters long'})
            return false;
        }

        return true;

    }

    addComment = e => {
        e.preventDefault()
        if(this.isValid()){
            const userId = isAuth().user._id
            const token = isAuth().token
            const postId = this.props.postId

            comment(userId, token, postId, { text : this.state.text })
            .then(data => {
                if(data.error){
                    console.log(data.error)
                } else {
                    this.setState({ text: ''})
                    this.props.updateCommments(data.comments)
                }
            })
        }
        
        
    }


    deleteComment = (comment) => {
        const userId = isAuth().user._id
        const token = isAuth().token
        const postId = this.props.postId

        uncomment(userId, token, postId, comment)
            .then(data => {
                if(data.error){
                    console.log(data.error)
                } else {
                    this.props.updateCommments(data.comments)
                }
            })

    }

    deleteConfirm = (comment) => {
        let answer = window.confirm("are you sure you want to delete Comment??")
        if(answer) {
            this.deleteComment(comment);
        }
    }

    render() {
        const {singlePostcomments} = this.props
        const {error} = this.state
        return (
            <>
                <h2 className="mt-5 mb-5">Leave a Comment</h2>
                
                <form onSubmit={this.addComment}>
                    <div className="form-group">
                        <input type="text" 
                        placeholder="Leave A Comment"
                        className="form-control" onChange={this.handleChange} value={this.state.text}/>
                        <button className="btn btn-raised btn-success mt-2">Post</button>
                    </div>
                </form>

                <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>{error}</div>
                
                <div className="col-md-12">
                    <h3 className="text-primary">{singlePostcomments.length } Comments</h3>
                </div>
                <hr />
                {singlePostcomments.map((comment, i ) => (
                            <div key={i}>
                                <Link to={`/user/${comment.postedBy._id}`}>
                                    <img src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}?${new Date().getTime()}`} alt={comment.postedBy.name} onError={i => (i.target.src = `${DefaultProfile}`)}
                                    className="rounded-circle mr-2 float-left border border-dark" 
                                    height="35"
                                    width="35"
                                    />
                                </Link>
                                    <div>
                                        <p className="lead">{comment.text}</p>
                                    </div>
                                    <p className="font-italic mark">
                                    Posted By {comment.postedBy.name } on {new Date(comment.created).toDateString()}
                                    <span>
                                    {isAuth().user && isAuth().user._id === comment.postedBy._id && 
                                        <span className="text-danger float-right" onClick={ ( ) => this.deleteConfirm(comment)}>Remove</span>
                                    }
                                    </span>
                                </p>
                            </div>
                        ))}
            </>
        )
    }
}

export default Comment