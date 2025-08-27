import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Bar = styled.header`
  background: #ffe5dc;
  border-bottom: 2px solid var(--primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  position: sticky;
  top: 0;
  z-index: 10;
`

const Brand = styled(Link)`
  font-weight: 800;
  letter-spacing: 0.5px;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`
const Nav = styled.nav`
  display: flex;
  gap: 16px;
  font-weight: 600;
  a {
    position: relative;
  }
  a[data-badge]:after {
    content: attr(data-badge);
    position: absolute;
    top: -8px;
    right: -10px;
    background: var(--primary);
    color: white;
    border-radius: 999px;
    font-size: 12px;
    padding: 2px 6px;
  }
  .active {
    color: var(--primary);
    text-decoration: underline;
  }
`

// Nav removido, não é necessário para o cabeçalho da home

export default function Header() {
  const { items } = useCart()
  const count = items.reduce((acc, i) => acc + i.qty, 0)
  const location = useLocation()
  return (
    <Bar>
      <Brand to="/">
        <img src="/src/assets/logo.png" alt="eFood" width="28" height="28" />{' '}
        eFood
      </Brand>
      <Nav>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Restaurantes
        </Link>
        <Link
          to="/carrinho"
          data-badge={count || null}
          className={location.pathname === '/carrinho' ? 'active' : ''}
        >
          Carrinho
        </Link>
      </Nav>
    </Bar>
  )
}
