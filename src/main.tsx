// HMR trigger: harmless comment to refresh dev server after CSS changes
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'
import './premium-upgrade.css'
import './enterprise-polish.css'
import './luxury-responsive.css'
import './responsive-premium.css'
import './mobile-professional.css'
import './transparent-dark.css'

// Touch file to trigger Vite HMR reload after CSS changes
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
