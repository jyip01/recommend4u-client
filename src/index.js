import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import './index.css';
import { RequestListProvider } from '../src/contexts/RequestListContext'



ReactDOM.render(
    <BrowserRouter>
        <RequestListProvider>
            <App />
        </RequestListProvider>
    </BrowserRouter>, 
    document.getElementById('root')
)
