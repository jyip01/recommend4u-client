import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './AllRequestsPage.css'
import RequestApiService from '../../services/request-api-services'
import RequestListContext from '../../contexts/RequestListContext'
import RequestItem from '../../components/RequestItem/RequestItem'
import UserService from '../../services/user-service'
import Error from '../../components/Error/Error'

export default class AllRequestsPage extends Component {
    static contextType = RequestListContext

    state={
        filtered:false
    }

    // if requestList is empty, make get request for all requests
    // important for refreshing
    componentDidMount(){
        this.context.clearError()

        if(!this.context.requestList.length){
            RequestApiService.getAllRequests()
                .then(this.context.setRequestList)
                .catch(this.context.setError)
        }
    }

    /* if there is no user token in local storage, meaning user is not logged in, render login link advising 
    user to log in to make new request. 
    if there is user token in local storage, meaning user is logged in, render new request button. */
    renderNewRequestButton=()=>{
        if(!UserService.getUserToken()){
            return(<>
                <p>Or, <Link className='loginLink' to='/login'>login</Link> to make a new request.</p>
                </>
            )
        }
        else{
            return(
                <Link to='/newrequest' className='newRequestButton'>New Request</Link>
            )
        }
        
    }

    // on form submission, filter list of requests based on keyword and category
    handleSubmit=ev=>{
        ev.preventDefault()

        let keyword = ev.target.keyword.value.toLowerCase()
        let category = ev.target.category.value

        RequestApiService.getAllRequests()
                .then(res=>{
                    let reqArrCopy = res

                    reqArrCopy = reqArrCopy.filter(function(request){
                        return request.product.toLowerCase().includes(keyword)
                    })
                    if(category !== 'All'){
                        reqArrCopy = reqArrCopy.filter(function(request){
                            return request.category === category
                        })
                    }
                    this.context.setRequestList(reqArrCopy)

                })
                .catch(this.context.setError)
    }

    // render number of results and each request
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
    
    render(){
        return(
            <Error>
                <section className='allRequestsPage'>
                    <div className='filterBox'>
                        <h2>ALL REQUESTS</h2>
                        <div className='filterForm'>
                            <p>Filter requests:</p>
                            <form onSubmit={this.handleSubmit}>
                                <div className='inputsDiv'>
                                    <div className='filterInputIndiv'>
                                        <label htmlFor="keyword">Keyword:</label>
                                        <textarea className = 'filterInput' row={2} name='keyword' id='keyword' />
                                    </div>
                                    <div className='filterInputIndiv'>
                                        <label htmlFor="category">Category</label>
                                        <select className = 'filterInput' id='category' name='category'>
                                            <option value='All'>All</option>
                                            <option value='Appliances'>Appliances</option>
                                            <option value='Baby & Kid'>Baby & Kid</option>
                                            <option value='Clothing & Shoes'>Clothing & Shoes</option>
                                            <option value='Entertainment'>Entertainment</option>
                                            <option value='Farm & Garden'>Farm & Garden</option>
                                            <option value='Furniture'>Furniture</option>
                                            <option value='Health & Beauty'>Health & Beauty</option>
                                            <option value='Household'>Household</option>
                                            <option value='Jewelry'>Jewelry</option>
                                            <option value='Materials'>Materials</option>
                                            <option value='Sporting Goods'>Sporting Goods</option>
                                            <option value='Technology'>Technology</option>
                                            <option value='Toys & Games'>Toys & Games</option>
                                            <option value='Transportation'>Transportation</option>
                                            <option value='Other'>Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='buttonsContainer'>
                                    <input className='searchButton' type='submit' value='Search'/>
                                    {this.renderNewRequestButton()}
                                </div>
                            </form> 
                        </div>
                    </div>
                    <div className='requestsBox'>
                        {this.renderRequests(this.context.requestList)}
                    </div> 
                </section>
            </Error>
        )
    }
}
