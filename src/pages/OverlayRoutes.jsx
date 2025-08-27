import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Restaurante from './Restaurante'
import Carrinho from './Carrinho'
import Entrega from './Entrega'
import Pagamento from './Pagamento'
import Confirmacao from './Confirmacao'
import OverlayBg from '../components/OverlayBg'

// Este componente renderiza o fundo (Home ou Restaurante) e overlays conforme a rota
export default function OverlayRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurante/:id" element={<Restaurante />} />
      <Route
        path="/carrinho"
        element={
          <>
            <Home />
            <OverlayBg />
            <Carrinho />
          </>
        }
      />
      <Route
        path="/entrega"
        element={
          <>
            <Home />
            <OverlayBg />
            <Entrega />
          </>
        }
      />
      <Route
        path="/pagamento"
        element={
          <>
            <Home />
            <OverlayBg />
            <Pagamento />
          </>
        }
      />
      <Route
        path="/confirmacao"
        element={
          <>
            <Home />
            <Confirmacao />
          </>
        }
      />
      {/* Overlay sobre restaurante também */}
      <Route
        path="/restaurante/:id/carrinho"
        element={
          <>
            <Restaurante />
            <OverlayBg />
            <Carrinho />
          </>
        }
      />
      <Route
        path="/restaurante/:id/entrega"
        element={
          <>
            <Restaurante />
            <OverlayBg />
            <Entrega />
          </>
        }
      />
      <Route
        path="/restaurante/:id/pagamento"
        element={
          <>
            <Restaurante />
            <OverlayBg />
            <Pagamento />
          </>
        }
      />
      <Route
        path="/restaurante/:id/confirmacao"
        element={
          <>
            <Restaurante />
            <Confirmacao />
          </>
        }
      />
    </Routes>
  )
}
