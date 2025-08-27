import styled from 'styled-components'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

const QtyButton = styled.button`
  background: #ffe5dc;
  color: #e66767;
  border: none;
  font-size: 18px;
  font-weight: 700;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  margin: 0 2px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ffd2c2;
  }
`

const CloseBtn = styled.button`
  position: absolute;
  top: 2px;
  right: 8px;
  background: none;
  border: none;
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  cursor: pointer;
  z-index: 21;
  opacity: 0.8;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
`

const Wrap = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  max-width: 100vw;
  height: 100vh;
  background: #e66767;
  padding: 8px 8px 0 8px;
  display: flex;
  flex-direction: column;
  z-index: 30;
  box-sizing: border-box;
  overflow-x: hidden;
`

const Item = styled.div`
  background: #ffe5dc;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 0;
  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 0;
    flex-shrink: 0;
  }
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .name {
    color: #e66767;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 2px;
  }
  .price {
    color: #e66767;
    font-size: 15px;
    font-weight: 400;
    margin-bottom: 0;
  }
  .remove {
    background: none;
    border: none;
    color: #e66767;
    font-size: 18px;
    cursor: pointer;
    align-self: flex-start;
    opacity: 0.7;
    transition: opacity 0.2s;
  }
  .remove:hover {
    opacity: 1;
  }
`

const TotalBar = styled.div`
  margin-top: 24px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  color: #fff;
  font-size: 16px;
`

const Button = styled.button`
  width: 100%;
  background: #ffe5dc;
  color: #e66767;
  font-weight: 700;
  border: none;
  border-radius: 0;
  padding: 8px 0;
  font-size: 15px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ffd2c2;
  }
`

export default function CartSidebar({ onClose }) {
  const { items, removeItem, total, inc, dec } = useCart()
  const navigate = useNavigate()

  return (
    <Wrap>
      <CloseBtn onClick={onClose} aria-label="Fechar carrinho">
        ×
      </CloseBtn>
      <div style={{ marginTop: 8 }} />
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {items.length === 0 && (
          <p style={{ color: '#fff', textAlign: 'center', marginTop: 32 }}>
            Seu carrinho está vazio.
          </p>
        )}
        {items.map((i, idx) => (
          <Item key={idx}>
            <img src={i.image} alt={i.name} />
            <div className="info">
              <div className="name">{i.name}</div>
              <div className="price">
                R$ {Number(i.price).toFixed(2).replace('.', ',')}
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}
              >
                <QtyButton
                  onClick={() => dec(i.id)}
                  aria-label="Diminuir quantidade"
                >
                  -
                </QtyButton>
                <span
                  style={{ minWidth: 24, textAlign: 'center', fontWeight: 700 }}
                >
                  {i.qty}
                </span>
                <QtyButton
                  onClick={() => inc(i.id)}
                  aria-label="Aumentar quantidade"
                >
                  +
                </QtyButton>
              </div>
            </div>
            <button
              className="remove"
              onClick={() => removeItem(i.id)}
              title="Remover"
            >
              <span role="img" aria-label="remover">
                🗑️
              </span>
            </button>
          </Item>
        ))}
      </div>
      <TotalBar>
        <span>Valor total</span>
        <span>R$ {total.toFixed(2).replace('.', ',')}</span>
      </TotalBar>
      <Button disabled={!items.length} onClick={() => navigate('/entrega')}>
        Continuar com a entrega
      </Button>
    </Wrap>
  )
}
