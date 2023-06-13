import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '@/theme'
import AdminProvider from '@/providers/adminProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AdminProvider />
    </ThemeProvider>
  </React.StrictMode>,
)
