import React, { Component } from 'react'
import { singlePost, update } from './apiPosts'

import DefaultPost from '../Images/postDefault.jpg'
import { Redirect } from 'react-router-dom'
import { isAuth } from '../Auth'

class EditPost extends Component {


    constructor() {
        super()
        this.state = {
            id: '',
            title: '',
            body: '',
            error: '',
            redirectToProfile: false,
            loading: false,
            fileSize: 0
        }
    }

    init = (postId) => {
        
        singlePost(postId)
        .then(data => {
            if(data.error) {
                this.setState({redirectToProfile: true});
            } else {
                this.setState({id: data._id, title: data.title , body: data.body, error: '' }); 
            }
        })
    }

    componentDidMount() {
        this.postData = new FormData()
        const postId = this.props.match.params.postId;
        this.init(postId)
    }


    handleChange = (name) => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value ;
        const fileSize = name === 'photo' ? event.target.files[0].size : 0 ;
        this.setState({error: ""});
        this.postData.set(name, value);
        this.setState({[name] : value , fileSize});
    }

    isValid = () => {
        const {title, body , fileSize } = this.state;

        if(fileSize> 100000 ) {
            this.setState({error: "File Size should be less than 100kb", loading: false})
            return false
        }
        if(title.length === 0 ) {
            this.setState({error: "Title is required", loading: false})
            return false
        }
        if(body.length === 0 ) {
            this.setState({error: "Title is required", loading: false})
            return false
        }

        return true;
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({loading: true});
        if(this.isValid()) {
            
            const postId = this.state.id
            const token = isAuth().token

            update(postId, token, this.postData)
            .then(data => {
                if(data.error) this.setState({error: data.error});
                else{
                    this.setState({ redirectToProfile: true });
                }
            })
        }
    }




    editPostForm = (title, body ) => (

        <form>

        <div className="form-group">
            <label className="text-muted">Photo</label>
            <input onChange={this.handleChange("photo")} type="file"  accept="image/*" className="form-control" />
        </div>
        
        <div className="form-group">
            <label className="text-muted">Title</label>
            <input onChange={this.handleChange("title")} type="text" className="form-control" value={title} />
        </div>

        <div className="form-group">
            <label className="text-muted">Description</label>
            <textarea onChange={this.handleChange("body")} type="text" className="form-control" value={body} />
        </div>

        <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Update Post</button>
    </form>

    )

    render() {
        const {id, title, body, redirectToProfile, loading, error} = this.state
        
        if(redirectToProfile) {
            return <Redirect to={`/user/${isAuth().user._id}`} />;
        }
        const photoUrl = id ? `${process.env.REACT_APP_API_URL}/post/photo/${id}?${new Date().getTime()}` : DefaultPost;

        return(
            <div className="container">
                <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>{error}</div>
                
                {loading ? <div className="jumbotron text-center"><h2>Loading...</h2></div>: ''}

                
                <h2 className="mt-5 mb-5">{title}</h2>
                <img style={{ height: "200px", width: "auto"}} className="img-thumbnail" src={photoUrl} onError={i => (i.target.src = `${DefaultPost}`)} alt={title} />
                {this.editPostForm(title, body)}
            </div>
        )
    }
}

export default EditPost