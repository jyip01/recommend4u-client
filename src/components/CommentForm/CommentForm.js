import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './CommentForm.css'
import UserService from '../../services/user-service'
import RequestListContext from '../../contexts/RequestListContext'
import RequestApiService from '../../services/request-api-services'
import Error from '../../components/Error/Error'


export default class CommentForm extends Component {

    static contextType = RequestListContext
    
    // upon form submit, make POST request to post new comment
    handleSubmit = ev => {
        ev.preventDefault()
        const { brand, why } = ev.target

        let userId = Number(UserService.getUserToken())

        RequestApiService.postNewComment(this.context.currentRequest.id, userId, brand.value, why.value)
            .then(()=>{
                brand.value=''
                why.value=''
                this.props.onSubmit()
            })
            .catch(this.context.setError)
    }
    
    componentDidMount=()=>{
        this.context.clearError()
    }

    /* if user is logged in, will render a form for user to post a comment. 
    if user is not logged in, will render a link, advising user to login to post a comment */
    renderCommentForm=()=>{

        if(!UserService.getUserToken()){
            return(
                <div className='comment commentForm'>
                    <p><Link to='/login'>Login</Link> to make a recommendation.</p>
                </div>
            )
        }
        else{
            return(
                <Error>
                    <div className='comment commentForm'>
                        <p>Make a recommendation:</p>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label htmlFor='brand'>Brand *</label>
                                <textarea className='inputArea' rows={2} name='brand' id='brand' required='require'/>
                            </div>
                            <div>
                                <label htmlFor='why'>Why? *</label>
                                <textarea className='inputArea' rows={3} name='why' id='why' required='require'/>
                            </div>
                            <input className='submitComment' type='submit' value='Submit'/>
                        </form> 
                    </div>
                </Error>
            )
        }
    }


    render(){
        return(<>
            {this.renderCommentForm()}
            </>
        )
    }

}


