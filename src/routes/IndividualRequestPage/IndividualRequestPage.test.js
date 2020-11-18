import React from 'react'
import ReactDOM from 'react-dom'
import IndividualRequestPage from './IndividualRequestPage'
import {BrowserRouter} from 'react-router-dom'
import renderer from 'react-test-renderer'
import { createMemoryHistory } from 'history'


let match = {path: "/requests/:id", 
            url: "/requests/8", 
            isExact: true, 
            params: {id: "8"}
            }

it('renders without crashing',()=>{
    const history = createMemoryHistory('/requests/your')
    const div = document.createElement('div')
    ReactDOM.render(<BrowserRouter><IndividualRequestPage match={match} history={history}/></BrowserRouter>,div)
    ReactDOM.unmountComponentAtNode(div)
})

it('should match with snapshot', () => {
    const history = createMemoryHistory('/requests/your')
    const tree = renderer
      .create(
        <BrowserRouter>
          <IndividualRequestPage match={match} history={history}/>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot()
})
