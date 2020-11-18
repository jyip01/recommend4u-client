import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './RequestItem.css'

export default class RequestItem extends Component {
    
    render(){
        return(
            <Link className='requestLink' to={`/requests/${this.props.request.id}`}>
                <div className='request'>
                    <p>Recommend4U...</p>
                    <h4>{this.props.request.product}</h4>
                    <div className='indivRequestInfo'>
                        <i className='fas fa-store'></i>
                        <p>{this.props.request.category}</p>
                        <i className='fas fa-clock'></i>
                        <p>{new Date(this.props.request.date).toLocaleDateString()}</p>
                    </div>
                </div>
            </Link>
        )
    }

}
