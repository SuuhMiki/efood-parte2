import Header from '../components/Header'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { maskCardNumber, maskExpiry, maskCVV, isValidCVV, isValidExpiry, isValidCardLuhn } from '../utils/masks'

export default function Pagamento(){
  const { setPayment, setOrderId, total } = useCart()
  const [form, setForm] = useState({numero:'', validade:'', cvv:''})
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  function validate(){
    const e = {}
    if(!isValidCardLuhn(form.numero)) e.numero = 'Número do cartão inválido'
    if(!isValidExpiry(form.validade)) e.validade = 'Validade inválida (MM/AA)'
    if(!isValidCVV(form.cvv)) e.cvv = 'CVV inválido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function onSubmit(e){
    e.preventDefault()
    if(!validate()) return
    setPayment({ ...form, total })
    // mock order id
    setOrderId(String(Math.floor(Math.random()*900000+100000)))
    navigate('/confirmacao')
  }

  return (
    <>
      <Header/>
      <div style={{maxWidth:600, margin:'24px auto', padding:'0 16px'}}>
        <h2>Pagamento</h2>
        <form onSubmit={onSubmit} noValidate>
          <div style={{display:'grid', gap:12}}>
            <div className="field">
              <label>Número do cartão</label>
              <input className={errors.numero ? 'error':''} placeholder="0000 0000 0000 0000" value={form.numero} onChange={e=>setForm({...form, numero: maskCardNumber(e.target.value)})} />
              {errors.numero && <small className="error">{errors.numero}</small>}
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
              <div className="field">
                <label>Validade (MM/AA)</label>
                <input className={errors.validade ? 'error':''} placeholder="MM/AA" value={form.validade} onChange={e=>setForm({...form, validade: maskExpiry(e.target.value)})} />
                {errors.validade && <small className="error">{errors.validade}</small>}
              </div>
              <div className="field">
                <label>CVV</label>
                <input className={errors.cvv ? 'error':''} placeholder="CVV" value={form.cvv} onChange={e=>setForm({...form, cvv: maskCVV(e.target.value)})} />
                {errors.cvv && <small className="error">{errors.cvv}</small>}
              </div>
            </div>
            <button type="submit" style={{background:'var(--primary)', color:'white', border:'none', padding:'10px 12px', borderRadius:8}}>Finalizar</button>
          </div>
        </form>
      </div>
      <Footer/>
    </>
  )
}
