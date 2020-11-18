import React, { Component } from 'react'
import './UpdateComment.css'
import RequestListContext from '../../contexts/RequestListContext'
import RequestApiService from '../../services/request-api-services'
import Error from '../../components/Error/Error'

export default class UpdateComment extends Component {
  
    static contextType = RequestListContext
  
    state = {
        error: null
    }

    // make PATCH request to update comment
    submitForm=ev=>{

        ev.preventDefault()

        const { brand, why } = ev.target
        
        this.setState({ error: null })

        let brandVal=brand.value.split(" ").join("")
        let whyVal = why.value.split(" ").join("")

        //checks that 'brand' and 'why' each contain at least one non-space character before update is made
        if(brandVal.length===0){
            this.setState({
                error: `'Brand' must contain at least one character.`
            })
        }
        else if(whyVal.length===0){
            this.setState({
                error: `'Why' must contain at least one character.`
            })
        }
        //if update comment form validation is successful, make PATCH comment and then GET new comments and update context 
        else{
            RequestApiService.updateComment(this.props.comment.id, brand.value, why.value)
                .then(res=>{
                    RequestApiService.getCommentsByRequestId(this.context.currentRequest.id)
                        .then(this.context.setCurrentComments)
                        .catch(this.context.setError)
                    this.props.onUpdateSuccess()
                })
                .catch(this.context.setError)
        }
    }

    componentDidMount=()=>{
        this.context.clearError()
    }
    
    render(){
        const {error} = this.state
        return(
            <Error>
                <form className='comment updateCommentForm' onSubmit={this.submitForm}>
                    <legend>Update your comment:</legend>
                    <div role='alert' id='error'>
                        {error && <p>{error}</p>}
                    </div>
                    <div className='updateReqInput'>
                        <label htmlFor='brand'>Brand</label>
                        <input type='text' name='brand' id='brand' defaultValue={this.props.comment.brand}/>
                    </div>
                    <div className='updateReqInput'>
                        <label htmlFor='why'>Why?</label>
                        <textarea row={5} type='text' name='why' id='why' defaultValue={this.props.comment.why}/>
                    </div>
                    <input className='updateComment updateReqButton' type='submit' value='Update'/>
                </form> 
            </Error>
        )
    }
}
