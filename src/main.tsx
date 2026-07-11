// HMR trigger: harmless comment to refresh dev server after CSS changes
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import App from './App'
import './styles.css'
import './premium-upgrade.css'
import './enterprise-polish.css'
import './luxury-responsive.css'
import './responsive-premium.css'
import './mobile-professional.css'
import './transparent-dark.css'
import './production-company.css'
import './cinematic-space.css'
import './enterprise-code-cinematic.css'

// Touch file to trigger Vite HMR reload after CSS changes
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Analytics />
    </BrowserRouter>
  </React.StrictMode>
)
