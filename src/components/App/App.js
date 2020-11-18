import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom'
import LandingPage from '../../routes/LandingPage/LandingPage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import AllRequestsPage from '../../routes/AllRequestsPage/AllRequestsPage'
import IndividualRequestPage from '../../routes/IndividualRequestPage/IndividualRequestPage'
import NewRequestPage from '../../routes/NewRequestPage/NewRequestPage'
import RegisterPage from '../../routes/RegisterPage/RegisterPage'
import UsersRequestsPage from '../../routes/UsersRequestsPage/UsersRequestsPage'
import './App.css'
import Nav from '../Nav/Nav'
import PrivateRoute from '../../components/Utils/PrivateRoute'
import PublicOnlyRoute from '../../components/Utils/PublicOnlyRoute'

class App extends Component {

  state = {
    isLoggedIn: false, //will be passed to Nav component to render different links based on logged in or not
  }

  /* Will be passed to LoginPage as props
  upon successful login, will set state isLoggedIn to true
  necessary for rendering different links in Nav*/
  handleLogin=()=>{
    this.setState({
      isLoggedIn:true
    })
  }

  render(){
    return (
      <>
      <Nav isLoggedIn={this.state.isLoggedIn}/>
      <main className='App'>
        <Switch>
          <PublicOnlyRoute exact path={'/'} component={LandingPage}/>
          <PublicOnlyRoute path={'/login'} render={()=> <LoginPage onLogin={this.handleLogin}/>}/>
          <PublicOnlyRoute path={'/register'} component={RegisterPage}/>
          <Route exact path={'/requests/all'} component={AllRequestsPage}/>
          <PrivateRoute exact path={'/requests/users'} component={UsersRequestsPage}/>
          <Route path={'/requests/:id'} render={(props)=> <IndividualRequestPage {...props}/>}/>
          <PrivateRoute path={'/newrequest'} component={NewRequestPage}/>
        </Switch>
      </main>
      <footer>
        <p>Created by Jessica Yip</p>
        <ul className='socialLinks'>
            <li><a href='https://linkedin.com/in/jessicayip13' target='_blank' rel='noopener noreferrer' aria-label='linkedin link'><i className='fab fa-linkedin fa-2x'></i></a></li>
            <li><a href='mailto:jessica.f.yip@gmail.com' target='_blank' rel='noopener noreferrer' aria-label='email link'><i className='fas fa-envelope-square fa-2x'></i></a></li>
            <li><a href='https://github.com/jyip01' target='_blank' rel='noopener noreferrer' aria-label='github link'><i className='fab fa-github-square fa-2x'></i></a></li>
        </ul>
      </footer>
      </>
    )
  }
  
}

export default App;