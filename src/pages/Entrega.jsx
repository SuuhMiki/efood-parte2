import React, { useState } from 'react'
import styled from 'styled-components'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

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
const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  label {
    font-size: 14px;
    margin-bottom: 2px;
    color: #ffe5dc;
  }
  input {
    background: #ffe5dc;
    border: none;
    border-radius: 0;
    padding: 6px 8px;
    font-size: 15px;
    color: #e66767;
    font-weight: 600;
    outline: none;
    margin-bottom: 0;
  }
  input::placeholder {
    color: #e66767;
    opacity: 0.7;
  }
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

export default function Entrega() {
  const { setDelivery } = useCart()
  const [form, setForm] = useState({
    nome: '',
    endereco: '',
    cidade: '',
    cep: '',
    numero: '',
    complemento: ''
  })
  const navigate = useNavigate()

  function onSubmit(e) {
    e.preventDefault()
    setDelivery(form)
    navigate('/pagamento')
  }

  return (
    <Sidebar>
      <div style={{ fontSize: 15, marginBottom: 8 }}>Entrega</div>
      <form onSubmit={onSubmit} noValidate autoComplete="off">
        <Field>
          <label>Quem irá receber</label>
          <input
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            placeholder="João Paulo de Souza"
          />
        </Field>
        <Field>
          <label>Endereço</label>
          <input
            value={form.endereco}
            onChange={(e) => setForm({ ...form, endereco: e.target.value })}
            placeholder="Endereço"
          />
        </Field>
        <Field>
          <label>Cidade</label>
          <input
            value={form.cidade}
            onChange={(e) => setForm({ ...form, cidade: e.target.value })}
            placeholder="Cidade"
          />
        </Field>
        <Row>
          <Field style={{ flex: 1 }}>
            <label>CEP</label>
            <input
              value={form.cep}
              onChange={e => setForm({ ...form, cep: e.target.value })}
              placeholder="CEP"
            />
          </Field>
          <Field style={{ flex: 1 }}>
            <label>Número</label>
            <input
              value={form.numero}
              onChange={(e) => setForm({ ...form, numero: e.target.value })}
              placeholder="Número"
            />
          </Field>
        </Row>
        <Field>
          <label>Complemento (opcional)</label>
          <input
            value={form.complemento}
            onChange={(e) => setForm({ ...form, complemento: e.target.value })}
            placeholder="Complemento (opcional)"
          />
        </Field>
        <Button type="submit">Continuar com o pagamento</Button>
        <Button
          type="button"
          style={{ background: '#ffe5dc', color: '#e66767', fontWeight: 700 }}
          onClick={() => navigate('/carrinho')}
        >
          Voltar para o carrinho
        </Button>
      </form>
    </Sidebar>
  )
}
