import React, { Component } from 'react';

import DefaultProfile from '../Images/avatar.png'
import { Redirect } from 'react-router-dom';
import { create } from './apiPosts'
import { isAuth } from '../Auth'

class NewPost extends Component {
    constructor(){
        super()
        this.state = {
            title:'',
            body: '',
            photo: '',
            error: '',
            fileSize: 0,
            user : {},
            loading: false,
            redirectToProfile: false
        }
    }

    componentDidMount() {
        this.postData = new FormData();
        this.setState({user: isAuth().user})
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

            const userId = isAuth().user._id;
            const token = isAuth().token

            create(userId, token, this.postData)
            .then(data => {
                if(data.error) this.setState({error: data.error});
                else{
                    this.setState({ redirectToProfile: true });
                }
            })
        }
    }

    createPostForm = (title, body ) => (

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

        <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Create Post</button>
    </form>

    )

    render() {
        const { title,body,user, error, redirectToProfile, loading} = this.state;

        if(redirectToProfile) {
            return <Redirect to={`/user/${user._id}`} />;
        }

        const photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` : DefaultProfile;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Create New Post</h2>
                <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>{error}</div>
                
                {loading ? <div className="jumbotron text-center"><h2>Loading...</h2></div>: ''}
                <div className="row">
                    <div className="col-md-1">
                        <img
                                        src={photoUrl}
                                        className="rounded-circle z-depth-0" 
                                        alt={user.name}
                                        height="50"
                                        width="50"
                                        onError={i => (i.target.src = `${DefaultProfile}`)}
                                    />

                    </div>
                    <div className="col-md-11">
                        {this.createPostForm(title, body)}
                    </div>
                </div>
            </div>

        )
    }
}

export default NewPost