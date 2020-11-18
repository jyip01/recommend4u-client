import React from 'react'
import ReactDOM from 'react-dom'
import AllRequestsPage from './AllRequestsPage'
import {BrowserRouter} from 'react-router-dom'
import renderer from 'react-test-renderer'

it('renders without crashing',()=>{
    const div = document.createElement('div')
    ReactDOM.render(<BrowserRouter><AllRequestsPage/></BrowserRouter>,div)
    ReactDOM.unmountComponentAtNode(div)
})

it('should match with snapshot', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <AllRequestsPage/>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot()
})
