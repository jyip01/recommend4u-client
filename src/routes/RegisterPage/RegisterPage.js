import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import Error from '../../components/Error/Error'
import RequestApiService from '../../services/request-api-services'
import RequestListContext from '../../contexts/RequestListContext'

export default class RegisterPage extends Component {

    static contextType = RequestListContext

    state = {
        toLogin: false,
        error: null
    }

    // upon successful login ... 
    onRegistrationSuccess = () => {
        this.setState({ 
            toLogin:true, // set true for redirecting to login page
        }) 
    }

    //when form is submitted, POST new user
    handleSubmit = ev =>{
        ev.preventDefault()
        const { firstName, lastName, email, password } = ev.target
    
        RequestApiService.postNewUser(firstName.value,lastName.value,email.value,password.value)
            .then(()=>{
                firstName.value = ''
                lastName.value = ''
                email.value = ''
                password.value = ''
                this.onRegistrationSuccess()
            })
            .catch(res=>{
                // if the error equals the validation errors possibly from the endpoint, setState to show error to user
                if(res.error === 'Password must contain one upper case, lower case, and number'){
                    this.setState({error:res.error})
                }
                else if(res.error === 'There is already an account associated with this email'){
                    this.setState({error:res.error})
                }
                else if(res.error === 'Password must be longer than 8 characters'){
                    this.setState({error:res.error})
                }
                else if(res.error === 'Password must not start or end with empty spaces'){
                    this.setState({error:res.error})
                }
                else if(res.error === 'Password must be less than 72 characters'){
                    this.setState({error:res.error})
                }
                else if(res.error === 'Password must contain one upper case, lower case, number'){
                    this.setState({error:res.error})
                }
                // if other error, set context error to show error boundary
                else{
                    this.context.setError(res.error)
                }
            })
    
    }

    componentDidMount=()=>{
        this.context.clearError()
    }
    
    render(){
        const { error } = this.state
        // upon successful registration, redirect to login page
        if(this.state.toLogin===true){
            return <Redirect to='/login'/>
        }
        return(
            <Error>
                <section className='loginSection' >
                    <p className='outsideFormP'>Get the advice you need for the products you want.</p>
                    <div className='loginForm'>
                        <h2>REGISTER</h2>
                        <form onSubmit={this.handleSubmit}>
                        <div role='alert' id='error'>
                                {error && <p>{error}</p>}
                            </div>
                        <div className='loginInputBox'>
                            <label htmlFor='firstName'>First Name *</label>
                            <input className='formInput' type='text' name='firstName' id='firstName' required='require' />
                        </div>
                        <div className='loginInputBox'>
                            <label htmlFor='lastName'>Last Name *</label>
                            <input className='formInput' type='text' name='lastName' id='lastName' required='require'/>
                        </div>
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
                    <p className='outsideFormP'>Already have an account? <Link to='/login'>Login.</Link></p>
                </section>
            </Error>
        )
    }
}