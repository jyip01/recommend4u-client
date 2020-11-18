import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

export default class LandingPage extends Component {
    render(){
        return(
            <>
            <section className='landingPage'>
                <div className='hero'>
                    <div className='heroTextDiv'>
                        <div className='heroText'>
                            <h2>ADVICE YOU NEED</h2>
                            <p>Looking at a product, but all of the options are giving you decision fatigue? </p>
                            <p>Recommend4U helps you decide which product is best to buy.</p>
                            <Link to='/register' className='registerButton'>Register</Link>
                        </div>
                    </div>
                </div>
                <div className='noAccountContainer'>
                    <h3>NO ACCOUNT? NO WORRIES.</h3>
                    <p>Someone may have already made a request for the product you're looking for. Anyone can see all existing requests without logging in.</p>
                    <Link to='/requests/all' className='seeExistingButton'>See Existing Requests</Link>
                    <p>Or, <Link className='signinLink' to='/login'>go to login page</Link> to find demo information.</p>
                </div>
                <div className='shortContainer'>
                    <div className='indivShort'>
                        <i className="fas fa-mouse fa-3x"></i>
                        <h4>EASY PROCESS</h4>
                        <p>Log in and make a request for whatever product you're looking to buy.</p>
                    </div>
                    <div className='indivShort'>
                        <i className="fas fa-users fa-3x"></i>
                        <h4>REAL PEOPLE</h4>
                        <p>Other users will advise you on their favorite, tried-and-true products.</p>      
                    </div>
                    <div className='indivShort'>
                        <i className="fas fa-shopping-cart fa-3x"></i>
                        <h4>LESS REGRET</h4>
                        <p>You'll get help narrowing down the best that's out there.</p>
                    </div>
                </div>
            </section>
            </>
        )
    }
}