import React, {Component} from 'react'
import './Error.css'

// Error boundary
class Error extends Component {
  constructor(props) {
      super(props);
      this.state = {
        hasError: false
      };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

  render(){
      if(this.state.hasError){
        return(
            <h2 className='errorBoundary'>Oh no! Recommend4U is currently experiencing technical difficulties. Please try again later.</h2>
        )
      }
      return this.props.children 
    }
}

export default Error