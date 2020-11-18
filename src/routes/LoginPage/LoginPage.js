import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import './LoginPage.css'
import RequestListContext from '../../contexts/RequestListContext'
import AuthApiService from '../../services/auth-api-service'
import TokenService from '../../services/token-service'
import UserService from '../../services/user-service'
import RequestApiService from '../../services/request-api-services'
import Error from '../../components/Error/Error'

export default class LoginPage extends Component {
    
    static contextType = RequestListContext

    state = {
        toRequests: false,
        error: null
    }

    // upon successful login ... 
    onLoginSuccess = (e, user) => {
        this.setState({ 
            toRequests:true, // set true for redirecting 
        },()=>{this.props.onLogin()}) // call this.props.onLogin which will set the App component isLoggedIn state to true
    }

    // when user submits signin form ...
    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        
        this.setState({
            error: null
        })

        const {email,password} = ev.target

       
        AuthApiService.postLogin({
            email: email.value,
            password: password.value,
        })
            // if login info is correct save the user's info to storage and call this.onLoginSuccess()
            .then(res=>{
                email.value=''
                password.value=''
                TokenService.saveAuthToken(res.authToken)
                //save user id in local storage for refresh
                UserService.saveUserToken(res.id)
                UserService.saveFNameToken(res.first_name) 
                UserService.saveLNameToken(res.last_name)
                
                //GET all request
                RequestApiService.getAllRequests()
                    .then(res=>{
                        this.context.setRequestList(res)
                        //GET user's requests
                        RequestApiService.getRequestsByUserId(UserService.getUserToken())
                            .then(this.context.setUsersList)
                            .catch(this.context.setError)
                    })
                    .catch(this.context.setError)
                    this.onLoginSuccess(res.user)      
            })
            .catch(res=>{
                // if the error equals the validation error possibly from the 
                //endpoint, setState to show error to user
                if(res.error === 'Incorrect email or password'){
                    this.setState({error:res.error})
                }
                // if other error, set context error to show error boundary
                else {
                    this.context.setError(res.error)
                }     
            })
    }   
    
    componentDidMount=()=>{
        this.context.clearError()
    }
    
    render(){
        const {error}=this.state
        // upon successful login, redirect to users requests page
        if(this.state.toRequests===true){
            return <Redirect to='/requests/all'/>
        }
        return(
            <Error>
                <section className='loginSection'>
                    <p className='outsideFormP'>Get the advice you need for the products you want.</p>
                    <div className='loginForm'>
                        <h2><i>LOGIN</i></h2>
                        <form  onSubmit={this.handleSubmitJwtAuth}>
                        <div role='alert' id='error'>
                            {error && <p>{error}</p>}
                        </div>
                        <p className='demo'>To demo, use <br/> email: test@gmail.com <br/> password: Password1</p>
                        <div className='loginInputBox'>
                            <label htmlFor='email'>Email *</label>
                            <input className='formInput' type='text' name='email' id='email' required='require'/>
                        </div>
                        <div className='loginInputBox'>
                            <label htmlFor='password'>Password *</label>
                            <input className='formInput' type='password' name='password' id='password' required='require'/>
                        </div>
                        <input type='submit' value='Submit' className='submitButton'/>
                        </form>
                    </div>
                    <p className='outsideFormP'>New to Recommend4U? <Link className='registerLink' to='/register'>Register.</Link></p>
                </section>
            </Error>
        )
    }
}