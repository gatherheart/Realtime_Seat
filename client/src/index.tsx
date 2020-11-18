import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'

import './index.css'
import App from './App'
import reducer from './reducer'

const store = createStore(reducer)

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
