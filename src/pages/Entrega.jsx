import React, { useState } from 'react'
import { maskCEP } from '../utils/masks'
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
  z-index: 130;
  box-sizing: border-box;
  box-shadow:
    -4px 0 32px 8px rgba(0, 0, 0, 0.25),
    -1px 0 0 0 #fff8f1;
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

export default function Entrega({ onClose, onNext }) {
  const { setDelivery } = useCart()
  const [form, setForm] = useState({
    nome: '',
    endereco: '',
    cidade: '',
    cep: '',
    numero: '',
    complemento: ''
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  function handleCloseEntrega() {
    if (typeof onClose === 'function') {
      onClose()
    } else {
      navigate(-1)
    }
  }

  function validate() {
    const newErrors = {}
    if (!form.nome.trim()) newErrors.nome = 'Informe o nome do destinatário'
    if (!form.endereco.trim()) newErrors.endereco = 'Informe o endereço'
    if (!form.cidade.trim()) newErrors.cidade = 'Informe a cidade'
    if (!/^\d{5}-?\d{3}$/.test(form.cep)) newErrors.cep = 'CEP inválido'
    if (!form.numero.trim()) newErrors.numero = 'Informe o número'
    return newErrors
  }

  function onSubmit(e) {
    e.preventDefault()
    const validation = validate()
    if (Object.keys(validation).length === 0) {
      setErrors({})
      setDelivery(form)
      // Aguarda o setDelivery antes de navegar
      setTimeout(() => {
        navigate('/pagamento')
      }, 0)
    } else {
      setErrors(validation)
    }
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
            className={errors.nome ? 'error' : ''}
          />
          {errors.nome && <small className="error">{errors.nome}</small>}
        </Field>
        <Field>
          <label>Endereço</label>
          <input
            value={form.endereco}
            onChange={(e) => setForm({ ...form, endereco: e.target.value })}
            placeholder="Endereço"
            className={errors.endereco ? 'error' : ''}
          />
          {errors.endereco && (
            <small className="error">{errors.endereco}</small>
          )}
        </Field>
        <Field>
          <label>Cidade</label>
          <input
            value={form.cidade}
            onChange={(e) => setForm({ ...form, cidade: e.target.value })}
            placeholder="Cidade"
            className={errors.cidade ? 'error' : ''}
          />
          {errors.cidade && <small className="error">{errors.cidade}</small>}
        </Field>
        <Row>
          <Field style={{ flex: 1 }}>
            <label>CEP</label>
            <input
              value={form.cep}
              onChange={(e) =>
                setForm({ ...form, cep: maskCEP(e.target.value) })
              }
              placeholder="CEP"
              className={errors.cep ? 'error' : ''}
            />
            {errors.cep && <small className="error">{errors.cep}</small>}
          </Field>
          <Field style={{ flex: 1 }}>
            <label>Número</label>
            <input
              value={form.numero}
              onChange={(e) => setForm({ ...form, numero: e.target.value })}
              placeholder="Número"
              className={errors.numero ? 'error' : ''}
            />
            {errors.numero && <small className="error">{errors.numero}</small>}
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
          onClick={handleCloseEntrega}
        >
          Fechar entrega
        </Button>
      </form>
    </Sidebar>
  )
}
