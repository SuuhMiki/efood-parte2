import { createRoot } from 'react-dom/client'
import App from './App'
import { CartProvider } from './context/CartContext'

const root = createRoot(document.getElementById('root')!)
root.render(
  <CartProvider>
    <App />
  </CartProvider>
)
