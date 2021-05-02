import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider as JotaiProvider } from "jotai"

ReactDOM.render(
  <React.StrictMode>
    <JotaiProvider>
      <Suspense fallback={<div>Wait for it</div>}>
        <App />
      </Suspense>
    </JotaiProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
