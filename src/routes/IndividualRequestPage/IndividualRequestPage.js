import React, { Component } from 'react'
import './IndividualRequestPage.css'
import RequestApiService from '../../services/request-api-services'
import RequestListContext from '../../contexts/RequestListContext'
import CommentForm from '../../components/CommentForm/CommentForm'
import CommentItem from '../../components/CommentItem/CommentItem'
import UserService from '../../services/user-service'
import {Redirect} from 'react-router-dom'
import UpdateRequest from '../../components/UpdateRequest/UpdateRequest'
import Error from '../../components/Error/Error'

export default class IndividualRequestPage extends Component {
    
    static contextType = RequestListContext

    state = {
        commentAdded: false,
        toRequests: false,
        updating: false,
    }

    // upon successful deletion ... 
    onDeleteSuccess = (e, user) => {
        this.setState({ 
            toRequests:true, // set true for redirecting 
        }) 
    }

    // upon successful request update, set updating to false
    onUpdateSuccess = ()=>{
        this.setState({
            updating:false,
        })
    }

    /* will be passed to CommentForm component as props.
    upon successfully adding comment, will set state commentAdded to true, and will make request for current request 
    and its comments, including newly added comment*/
    handleSubmit=()=>{
        this.setState({
            commentAdded: true
        })

        RequestApiService.getRequestById(this.props.match.params.id)
            .then(this.context.setCurrentRequest)
            .catch(this.context.setError)

        RequestApiService.getCommentsByRequestId(this.props.match.params.id)
            .then(this.context.setCurrentComments)
            .catch(this.context.setError)


    }

    componentWillMount=()=>{
        RequestApiService.getRequestById(this.props.match.params.id)
            .then(this.context.setCurrentRequest)
            .catch(this.context.setError)

        RequestApiService.getCommentsByRequestId(this.props.match.params.id)
            .then(this.context.setCurrentComments)
            .catch(this.context.setError)
        
    }

    renderComments=(comments)=>{
        let results
        if(comments.length===1){
            results = '1 Recommendation'
        }
        else{
            results = `${comments.length} Recommendations`
        }
        
        let commentItems = comments.map(comment=>
                <CommentItem key={comment.id} comment={comment}/>
            )

        return(
            <>
            <p className='commentsCount'>{results}</p>
            <div>{commentItems}</div>
            </>
        )
    }

    //when delete request button is clicked, will make DELETE request, GET new request list
    deleteRequest=()=>{
        RequestApiService.deleteRequest(this.context.currentRequest.id)
            .then(res=>{
                RequestApiService.getAllRequests()
                    .then(res=>{
                        this.context.setRequestList(res)
                        //GET user's requests
                        RequestApiService.getRequestsByUserId(UserService.getUserToken())
                            .then(this.context.setUsersList)
                            .catch(this.context.setError)
                    })
                    .catch(this.context.setError)
                
                this.onDeleteSuccess()
            })
            .catch(this.context.setError)
    }

    // when update request button is clicked, will set updating state to true
    updateRequest=()=>{
        this.setState({
            updating:true
        })
    }

    //if currently logged in user has user_id attached to current request, will render delete and edit buttons
    renderDeleteEditButtons=()=>{
        if(this.context.currentRequest.user_id===UserService.getUserToken()){
            return (
                <div className='editAndDeleteBox'>
                    <button onClick={this.deleteRequest} className='deleteButton'>Delete</button>
                    <button onClick={this.updateRequest} className='editButton'>Edit</button>
                </div>
            )
        }
    }

    /* if this.state.updating is false, renders request.
    if this.state.updating is true, will render UpdateRequest component*/
    renderRequest=()=>{
        if(this.state.updating===false){
            
            let lastName = this.context.currentRequest.last_name
            let lastInitial = new String(lastName).charAt(0)

            return(
                <div className='requestInfo'>
                    <h2>{this.context.currentRequest.product}</h2>
                    <div className='requestData'>
                        <div className='iconContainer'>
                            <i className="fas fa-user"></i>
                            <i className="fas fa-clock"></i>
                            <i className="fas fa-store"></i>
                        </div>
                        <div className='infoContainer'>
                            <p>{this.context.currentRequest.first_name} {lastInitial}.</p>
                            <p>{new Date(this.context.currentRequest.date).toLocaleDateString()}</p>
                            <p>{this.context.currentRequest.category}</p>
                        </div>
                    </div>
                    <p>{this.context.currentRequest.info}</p>
                    {this.renderDeleteEditButtons()}
                </div>
            )
        }
        else{
            return(
                <UpdateRequest request={this.context.currentRequest} onUpdateSuccess={this.onUpdateSuccess}/>
            )
        }
    }

    componentDidMount=()=>{
        this.context.clearError()
    }
    

    render(){
        // upon successful delete, redirect to your users requests
        if(this.state.toRequests===true){
            return <Redirect to='/requests/users'/>
        }
 
        return(
            <Error>
                <section className='indivRequestPage'>
                    <div className='sideBar'>
                    <button className='backButton' onClick={this.props.history.goBack}>Back</button>
                    </div>
                    <div className='mainBar'>
                    {this.renderRequest()}
                    <div className='commentSection'>
                        <CommentForm onSubmit={this.handleSubmit}/>
                        {this.renderComments(this.context.currentComments)}
                    </div>
                    </div>
                </section>
            </Error>
        )
    }
}