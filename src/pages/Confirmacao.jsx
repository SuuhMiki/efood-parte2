import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

const OverlayBg = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 100;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
`

const Sidebar = styled.div`
  width: 400px;
  max-width: 100vw;
  height: 100vh;
  background: #ea6a6a;
  color: #fff;
  padding: 24px 24px 0 24px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: flex-start;
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

export default function Confirmacao() {
  const { items, delivery, payment, clear } = useCart()
  const [order, setOrder] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Monta o payload para a API
    if (!order && items && delivery && payment) {
      fetch('https://ebac-fake-api.vercel.app/api/efood/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: items.map((i) => ({
            id: i.id,
            price: i.price,
            name: i.name,
            image: i.image,
            quantity: i.qty
          })),
          delivery,
          payment
        })
      })
        .then((res) => res.json())
        .then((data) => {
          setOrder(data)
          clear()
        })
    }
  }, [items, delivery, payment, order, clear])

  if (!order) {
    return (
      <Sidebar>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>
          Processando pedido...
        </div>
      </Sidebar>
    )
  }

  return (
    <OverlayBg>
      <Sidebar>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>
          Pedido realizado -{' '}
          <span style={{ fontWeight: 700 }}>
            {order.orderId ? `(${order.orderId})` : ''}
          </span>
        </div>
        <div style={{ fontSize: 13, marginBottom: 16, lineHeight: 1.5 }}>
          Estamos felizes em informar que seu pedido já está em processo de
          preparação e, em breve, será entregue no endereço fornecido.
          <br />
          <br />
          Gostaríamos de ressaltar que nossos entregadores não estão autorizados
          a realizar cobranças extras.
          <br />
          <br />
          Lembre-se da importância de higienizar as mãos após o recebimento do
          pedido, garantindo assim sua segurança e bem-estar durante a refeição.
          <br />
          <br />
          Esperamos que desfrute de uma deliciosa e agradável experiência
          gastronômica. Bom apetite!
        </div>
        <Button onClick={() => navigate('/')}>Concluir</Button>
      </Sidebar>
    </OverlayBg>
  )
}
