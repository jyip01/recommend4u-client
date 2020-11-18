import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
import UserService from '../../services/user-service'
import TokenService from '../../services/token-service'
import RequestListContext from '../../contexts/RequestListContext'

export default class Nav extends Component {
  
  static contextType = RequestListContext
  
  state={
    loggedIn: null
  }
  
  /* Nav component receives isLoggedIn App component state as a prop.
  If isLoggedIn is true, meaning a user has logged in, setState loggedIn to true */
  componentWillReceiveProps(nextProps){
    if(nextProps.isLoggedIn){
        this.setState({
            loggedIn: true
        })
    }
  }
  
  // when user clicks logout link, clear user info stored in local storage and set loggedIn to false
  handleLogoutClick = () => {
    
    TokenService.clearAuthToken()
    UserService.clearUserToken()
    UserService.clearFNameToken()
    UserService.clearLNameToken()
    
    this.setState({
        loggedIn:false
    })

  }

  renderLoginLinks(){
    return(
      <ul>
        <li><Link to='/login' className='loginButton'>Log In</Link></li>
      </ul>
    )
  }

  renderLogoutLinks(){
    return(<>
      <div className = 'dropdown'>
          <button className='dropdownButton'>Menu</button>
          <div className='dropdownContent'> 
            <Link to='/requests/all'>All Requests</Link> 
            <Link to='/requests/users'>Your Requests</Link>
            <Link onClick={this.handleLogoutClick} to='/'>Logout</Link>
          </div>
      </div>
      </>
    )
  }

  /* if there is auth token in local storage, meaning user is logged in, render logout links.
  if there is no auth token in local store, meaning user is not logged in, render login links */
  render(){
    return(
      <nav>
        <h1>
        <Link to='/'>Recommend4U</Link>
        </h1>
        {TokenService.hasAuthToken()
        ? this.renderLogoutLinks()
        : this.renderLoginLinks()}
      </nav>
    )
  }
}


