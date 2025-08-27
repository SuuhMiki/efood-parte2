import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  max-width: 100vw;
  height: 100vh;
  background: #e66767;
  color: #fff;
  padding: 16px 16px 0 16px;
  display: flex;
  flex-direction: column;
  z-index: 30;
  box-sizing: border-box;
`
const Label = styled.label`
  font-size: 13px;
  color: #ffe5dc;
  margin-bottom: 2px;
`
const Input = styled.input`
  background: #ffe5dc;
  border: none;
  border-radius: 0;
  padding: 6px 8px;
  font-size: 15px;
  color: #e66767;
  font-weight: 600;
  outline: none;
  margin-bottom: 8px;
  width: 100%;
`
const Row = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
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
export default function Pagamento() {
  const [form, setForm] = useState({
    nome: '',
    numero: '',
    cvv: '',
    mes: '',
    ano: ''
  })
  const navigate = useNavigate()
  const { setPayment } = useCart()
  const valor = 190.9 // valor fixo para exemplo

  function onSubmit(e) {
    e.preventDefault()
    setPayment(form)
    navigate('/confirmacao')
  }

  return (
    <Sidebar>
      <div style={{ fontSize: 13, marginBottom: 8, fontWeight: 700 }}>
        Pagamento - Valor a pagar R$ {valor.toFixed(2)}
      </div>
      <form onSubmit={onSubmit} noValidate autoComplete="off">
        <Label>Nome no cartão</Label>
        <Input
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          placeholder="João Paulo de Souza"
        />
        <Row>
          <div style={{ flex: 2 }}>
            <Label>Número do cartão</Label>
            <Input
              value={form.numero}
              onChange={(e) => setForm({ ...form, numero: e.target.value })}
              placeholder="Número do cartão"
            />
          </div>
          <div style={{ flex: 1 }}>
            <Label>CVV</Label>
            <Input
              value={form.cvv}
              onChange={(e) => setForm({ ...form, cvv: e.target.value })}
              placeholder="CVV"
            />
          </div>
        </Row>
        <Row>
          <div style={{ flex: 1 }}>
            <Label>Mês de vencimento</Label>
            <Input
              value={form.mes}
              onChange={(e) => setForm({ ...form, mes: e.target.value })}
              placeholder="MM"
            />
          </div>
          <div style={{ flex: 1 }}>
            <Label>Ano de vencimento</Label>
            <Input
              value={form.ano}
              onChange={(e) => setForm({ ...form, ano: e.target.value })}
              placeholder="AAAA"
            />
          </div>
        </Row>
        <Button type="submit">Finalizar pagamento</Button>
        <Button
          type="button"
          style={{ background: '#ffe5dc', color: '#e66767', fontWeight: 700 }}
          onClick={() => navigate('/entrega')}
        >
          Voltar para a edição de endereço
        </Button>
      </form>
    </Sidebar>
  )
}
