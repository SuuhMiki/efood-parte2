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
  position: fixed;
  top: 0;
  right: 0;
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
const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  cursor: pointer;
  z-index: 2;
  line-height: 1;
  padding: 0;
  transition: color 0.2s;
  &:hover {
    color: #ffd2c2;
  }
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
    if (!order && items && delivery && payment) {
      // Monta o payload conforme o backend espera
      const payload = {
        products: items.map((i) => ({
          id: i.id,
          price: i.price
        })),
        delivery: {
          receiver: delivery.nome,
          address: {
            description: delivery.endereco,
            city: delivery.cidade,
            zipCode: delivery.cep,
            number: Number(delivery.numero),
            complement: delivery.complemento || ''
          }
        },
        payment: {
          card: {
            name: payment.nome,
            number: payment.numero.replace(/\s/g, ''),
            code: Number(payment.cvv),
            expires: {
              month: Number(payment.mes),
              year: Number(payment.ano)
            }
          }
        }
      }
      fetch('https://ebac-fake-api.vercel.app/api/efood/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then((res) => res.json())
        .then((data) => {
          setOrder(data)
          clear()
        })
    }
  }, [items, delivery, payment, order, clear])

  if (!payment) {
    return (
      <Sidebar style={{ position: 'relative' }}>
        <CloseButton aria-label="Fechar" onClick={() => navigate(-1)}>
          &times;
        </CloseButton>
        <div
          style={{
            fontWeight: 700,
            fontSize: 16,
            marginBottom: 12,
            color: '#fff'
          }}
        >
          Adicione os dados de pagamento para concluir o pedido.
        </div>
        <Button onClick={() => navigate('/pagamento')}>
          Ir para pagamento
        </Button>
      </Sidebar>
    )
  }

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
        <div
          style={{
            fontWeight: 700,
            fontSize: 17,
            marginBottom: 18,
            fontFamily: 'Roboto, Arial, sans-serif',
            color: 'rgba(255,235,217,1)'
          }}
        >
          Pedido realizado - {order.orderId ? `(${order.orderId})` : ''}
        </div>
        <div
          style={{
            fontSize: 15,
            marginBottom: 16,
            lineHeight: 1.7,
            fontFamily: 'Roboto, Arial, sans-serif',
            color: 'rgba(255,235,217,1)'
          }}
        >
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
