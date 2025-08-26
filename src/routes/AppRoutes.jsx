import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Restaurante from '../pages/Restaurante'
import Carrinho from '../pages/Carrinho'
import Entrega from '../pages/Entrega'
import Pagamento from '../pages/Pagamento'
import Confirmacao from '../pages/Confirmacao'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurante/:id" element={<Restaurante />} />
      <Route path="/carrinho" element={<Carrinho />} />
      <Route path="/entrega" element={<Entrega />} />
      <Route path="/pagamento" element={<Pagamento />} />
      <Route path="/confirmacao" element={<Confirmacao />} />
    </Routes>
  )
}
