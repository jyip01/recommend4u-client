import React from 'react'
import ReactDOM from 'react-dom'
import LoginPage from './LoginPage'
import {BrowserRouter} from 'react-router-dom'
import renderer from 'react-test-renderer'

it('renders without crashing',()=>{
    const div = document.createElement('div')
    ReactDOM.render(<BrowserRouter><LoginPage/></BrowserRouter>,div)
    ReactDOM.unmountComponentAtNode(div)
})

it('should match with snapshot', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <LoginPage/>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot()
})
