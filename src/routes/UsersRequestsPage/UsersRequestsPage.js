import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RequestApiService from '../../services/request-api-services'
import RequestListContext from '../../contexts/RequestListContext'
import RequestItem from '../../components/RequestItem/RequestItem'
import UserService from '../../services/user-service'
import Error from '../../components/Error/Error'
import './UsersRequestsPage.css'


export default class UsersRequestsPage extends Component {
    
    static contextType = RequestListContext

    // if requestList is empty, make get request for all requests
    // important for refreshing
    componentWillMount=()=>{
        if(!this.context.usersList.length){
            RequestApiService.getRequestsByUserId(UserService.getUserToken())
                .then(this.context.setUsersList)
                .catch(this.context.setError)
        }
    }

    renderRequests=(requests)=>{
        let results
        if(requests.length===1){
            results = '1 Result'
        }
        else{
            results = `${requests.length} Results`
        }
        
        let requestItems = requests.map(request=>
                <RequestItem key={request.id} request={request}/>
            )

        return(
            <>
            <p className="resultsCount">{results}</p>
            <div>{requestItems}</div>
            </>
        )
    }

    componentDidMount=()=>{
        this.context.clearError()
    }
    
    render(){
        return(
            <Error>
                <section className='allRequestsPage'>
                    <div className='filterBox filterBoxUsers'>
                        <h2>YOUR REQUESTS</h2>
                        <Link to='/newrequest' className='newRequestButtonUsers'>New Request</Link> 
                    </div>
                    <div className='requestsBox'>
                        {this.renderRequests(this.context.usersList)}
                    </div> 
                </section>
            </Error>
        )
    }
}
