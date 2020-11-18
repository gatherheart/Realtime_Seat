import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import { composeWithDevTools } from 'redux-devtools-extension' // debugger

import './index.css'
import App from './App'
import reducer from './reducer'

const store = createStore(reducer, composeWithDevTools({})())

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <CssBaseline />
      <App />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
