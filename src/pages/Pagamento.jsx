import React, { useState } from 'react'
import { maskCardNumber, maskCVV, maskExpiry } from '../utils/masks'
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
  z-index: 130;
  box-sizing: border-box;
  box-shadow:
    -4px 0 32px 8px rgba(0, 0, 0, 0.25),
    -1px 0 0 0 #fff8f1;
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

function validate(form) {
  const errors = {}
  if (!form.nome.trim()) errors.nome = 'Informe o nome no cartão'
  if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(form.numero))
    errors.numero = 'Número do cartão inválido'
  if (!/^\d{3,4}$/.test(form.cvv)) errors.cvv = 'CVV inválido'
  if (!/^\d{2}$/.test(form.mes)) errors.mes = 'Mês inválido'
  if (!/^\d{4}$/.test(form.ano)) errors.ano = 'Ano inválido'
  return errors
}

export default function Pagamento({ onClose, onNext }) {
  const [form, setForm] = useState({
    nome: '',
    numero: '',
    cvv: '',
    mes: '',
    ano: ''
  })
  const [errors, setErrors] = useState({})
  const { setPayment } = useCart()
  const valor = 190.9 // valor fixo para exemplo
  const navigate = useNavigate()

  function onSubmit(e) {
    e.preventDefault()
    const validation = validate(form)
    if (Object.keys(validation).length === 0) {
      setErrors({})
      setPayment(form)
      navigate('/confirmacao')
    } else {
      setErrors(validation)
    }
  }

  function handleClosePagamento() {
    if (typeof onClose === 'function') {
      onClose()
    } else {
      navigate(-1)
    }
  }

  return (
    <Sidebar>
      <div style={{ fontSize: 13, marginBottom: 8, fontWeight: 700 }}>
        Pagamento - Valor a pagar R$ {valor.toFixed(2)}
      </div>
      {Object.keys(errors).length > 0 && (
        <div
          style={{
            background: '#fff8f1',
            color: '#e66767',
            padding: 8,
            borderRadius: 4,
            marginBottom: 8,
            fontSize: 13
          }}
        >
          Preencha todos os campos obrigatórios corretamente.
        </div>
      )}
      <form onSubmit={onSubmit} noValidate autoComplete="off">
        <Label>Nome no cartão</Label>
        <Input
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          placeholder="João Paulo de Souza"
          className={errors.nome ? 'error' : ''}
        />
        {errors.nome && <small className="error">{errors.nome}</small>}
        <Row>
          <div style={{ flex: 2 }}>
            <Label>Número do cartão</Label>
            <Input
              value={form.numero}
              onChange={(e) =>
                setForm({ ...form, numero: maskCardNumber(e.target.value) })
              }
              placeholder="Número do cartão"
              maxLength={19}
              className={errors.numero ? 'error' : ''}
            />
            {errors.numero && <small className="error">{errors.numero}</small>}
          </div>
          <div style={{ flex: 1 }}>
            <Label>CVV</Label>
            <Input
              value={form.cvv}
              onChange={(e) =>
                setForm({ ...form, cvv: maskCVV(e.target.value) })
              }
              placeholder="CVV"
              maxLength={4}
              className={errors.cvv ? 'error' : ''}
            />
            {errors.cvv && <small className="error">{errors.cvv}</small>}
          </div>
        </Row>
        <Row>
          <div style={{ flex: 1 }}>
            <Label>Mês de vencimento</Label>
            <Input
              value={form.mes}
              onChange={(e) => {
                let v = e.target.value.replace(/\D/g, '').slice(0, 2)
                setForm({ ...form, mes: v })
              }}
              placeholder="MM"
              maxLength={2}
              className={errors.mes ? 'error' : ''}
            />
            {errors.mes && <small className="error">{errors.mes}</small>}
          </div>
          <div style={{ flex: 1 }}>
            <Label>Ano de vencimento</Label>
            <Input
              value={form.ano}
              onChange={(e) => {
                let v = e.target.value.replace(/\D/g, '').slice(0, 4)
                setForm({ ...form, ano: v })
              }}
              placeholder="AAAA"
              maxLength={4}
              className={errors.ano ? 'error' : ''}
            />
            {errors.ano && <small className="error">{errors.ano}</small>}
          </div>
        </Row>
        <Button type="submit">Finalizar pagamento</Button>
        <Button
          type="button"
          style={{ background: '#ffe5dc', color: '#e66767', fontWeight: 700 }}
          onClick={handleClosePagamento}
        >
          Fechar pagamento
        </Button>
      </form>
    </Sidebar>
  )
}
