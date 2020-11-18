import React, { Component } from 'react'
import './NewRequestPage.css'
import RequestApiService from '../../services/request-api-services'
import UserService from '../../services/user-service'
import RequestListContext from '../../contexts/RequestListContext'
import Error from '../../components/Error/Error'

export default class NewRequestPage extends Component {
    static contextType = RequestListContext

    //used for redirecting to users requests page on form submit
    static defaultProps = {
        history: {
            push: () => {},
        }
    }
    
    state = {
        error: null
    }

    onSubmitSuccess = ()=>{
        //redirects to users requests page on successful form submission
        const { history } = this.props
        history.push('/requests/users')
    }

    //when form is submitted, posts new request and the GETs all requests and users request list
    handleSubmit = ev => {
        ev.preventDefault()
        const { product, category, moreInfo } = ev.target

        this.setState({ error: null })

        let userId = UserService.getUserToken()

        RequestApiService.postNewRequest(userId, product.value, category.value, moreInfo.value)
            .then(res=>{
                RequestApiService.getAllRequests()
                    .then(res=>{
                        this.context.setRequestList(res)
                        RequestApiService.getRequestsByUserId(userId)
                            .then(this.context.setUsersList)
                            .catch()
                    })
                    .catch()
                this.onSubmitSuccess()
            })
            .catch(this.context.setError)
    }

    componentDidMount =()=>{
        this.context.clearError()
    }
    
    render(){
        return(
            <Error>
                <section className='newRequestPage'>
                    <div className='sideBar'>
                        <button className='backButton' onClick={this.props.history.goBack}>Back</button>
                    </div>
                    <div className='mainBar'>
                        <h2>What are you looking for?</h2>
                        <form className='newRequestForm' onSubmit={this.handleSubmit}>
                            <div className='inputBox'>
                                <label htmlFor="product">Product * </label>
                                <input className='newReqInput' type="text" name='product' id='product' required='require'/>
                            </div>
                            <div className='inputBox'>
                                <label htmlFor="category">Category * </label>
                                <select className='newReqInput' id='category' name='category' required>
                                    <option value=''> </option>
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
                            <div className='inputBox'>
                                <label htmlFor="moreInfo">More Info *</label>
                                <textarea className='newReqInput' rows={10} name='moreInfo' id='moreInfo' required='require' />
                            </div>
                            <input className='submitRequest submitRequestButton' type='submit' value='Submit'/>
                        </form> 
                    </div>
                </section>
            </Error>
        )
    }
}