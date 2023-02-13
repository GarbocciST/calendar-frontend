import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { CalendarApp } from './CalendarApp'
import { store } from './store'

import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <CalendarApp />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
)
