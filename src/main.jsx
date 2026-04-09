import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        gutter={8}
        containerStyle={{ top: 72 }}
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: '14px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: '500',
            padding: '12px 16px',
            boxShadow: '0 8px 32px -4px rgba(0,0,0,0.15)',
            border: '1px solid rgba(0,0,0,0.06)',
            maxWidth: '380px',
          },
          success: {
            style: {
              background: '#10b981',
              color: '#fff',
              border: '1px solid #059669',
            },
            iconTheme: { primary: '#fff', secondary: '#10b981' },
          },
          error: {
            style: {
              background: '#ef4444',
              color: '#fff',
              border: '1px solid #dc2626',
            },
            iconTheme: { primary: '#fff', secondary: '#ef4444' },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)
