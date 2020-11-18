import React, { Component } from 'react'
import './CommentItem.css'
import RequestListContext from '../../contexts/RequestListContext'
import UserService from '../../services/user-service'
import RequestApiService from '../../services/request-api-services'
import UpdateComment from '../../components/UpdateComment/UpdateComment'
import Error from '../../components/Error/Error'

export default class RequestItem extends Component {
    
    static contextType = RequestListContext
    
    //used to render update form if user is actively updating a comment
    state = {
        updating: false,
    }

    // makes DELETE request to delete comment 
    deleteComment=()=>{
        RequestApiService.deleteComment(this.props.comment.id)
            .then(res=>{
                RequestApiService.getCommentsByRequestId(this.context.currentRequest.id)
                    .then(this.context.setCurrentComments)
                    .catch(this.context.setError)
            })
            .catch(this.context.setError)
    }
    
    // when user clicks on edit button, will change state for updating to true
    updateComment=()=>{
        this.setState({
            updating:true
        })
    }

    /* will be passed to UpdateComment 
    when user clicks update button on UpdateCommentForm, will change state which will re-render
    CommentItem and update it with user's changes */
    onUpdateSuccess = ()=>{
        this.setState({
            updating:false,
        })
    }

    //if comment is associated with currently logged in user's id, will render edit and delete buttons
    renderDeleteEditButtons=()=>{
        if(this.props.comment.user_id===UserService.getUserToken()){
            return (
                <div className='commentButtonBox'>
                    <button onClick={this.deleteComment} className='deleteButton'>Delete</button>
                    <button onClick={this.updateComment} className='editButtonComment'>Edit</button>
                </div>
            )
        }
    }

    /*if this.state.updating is false, will render comment, 
    but if this.state.updating is true, will render UpdateComment form*/
    renderComment=()=>{
        if(this.state.updating===false){
            return(
                <div className='comment'>
                    <h3>{this.props.comment.brand}</h3>
                    <div className='commentInfo'>
                        <i className="fas fa-user"></i>
                        <p>{this.props.comment.first_name} {this.props.comment.last_name.charAt(0)}.</p>
                    </div>
                    <p>{this.props.comment.why}</p>
                    {this.renderDeleteEditButtons()}
                </div>
            )
        }
        else{
            return(
                <UpdateComment comment={this.props.comment} onUpdateSuccess={this.onUpdateSuccess}/>
            )
        }
    }

    componentDidMount=()=>{
        this.context.clearError()
    }
    
    render(){
        return(<Error>
            {this.renderComment()}
            </Error>
        )
    }
    
}