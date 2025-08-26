import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import GlobalStyle from './styles/GlobalStyle'
import { CartProvider } from './context/CartContext'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
)
