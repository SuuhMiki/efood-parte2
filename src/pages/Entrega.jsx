import Header from '../components/Header'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { maskCEP, maskPhoneBR, isValidCEP, isValidPhone } from '../utils/masks'

export default function Entrega(){
  const { setDelivery } = useCart()
  const [form, setForm] = useState({nome:'', telefone:'', endereco:'', cidade:'', cep:''})
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  function validate(){
    const e = {}
    if(!form.nome.trim()) e.nome = 'Informe seu nome completo'
    if(!isValidPhone(form.telefone)) e.telefone = 'Telefone inválido'
    if(!form.endereco.trim()) e.endereco = 'Informe o endereço'
    if(!form.cidade.trim()) e.cidade = 'Informe a cidade'
    if(!isValidCEP(form.cep)) e.cep = 'CEP inválido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function onSubmit(e){
    e.preventDefault()
    if(!validate()) return
    setDelivery(form)
    navigate('/pagamento')
  }

  return (
    <>
      <Header/>
      <div style={{maxWidth:600, margin:'24px auto', padding:'0 16px'}}>
        <h2>Entrega</h2>
        <p style={{margin:'8px 0 16px'}}>Preencha seus dados para entrega.</p>
        <form onSubmit={onSubmit} noValidate>
          <div style={{display:'grid', gap:12}}>
            <div className="field">
              <label>Nome completo</label>
              <input className={errors.nome ? 'error':''} value={form.nome} onChange={e=>setForm({...form, nome:e.target.value})} placeholder="Ex: Maria Silva" />
              {errors.nome && <small className="error">{errors.nome}</small>}
            </div>
            <div className="field">
              <label>Telefone</label>
              <input className={errors.telefone ? 'error':''} value={form.telefone} onChange={e=>setForm({...form, telefone: maskPhoneBR(e.target.value)})} placeholder="(11) 98888-7777" />
              {errors.telefone && <small className="error">{errors.telefone}</small>}
            </div>
            <div className="field">
              <label>Endereço</label>
              <input className={errors.endereco ? 'error':''} value={form.endereco} onChange={e=>setForm({...form, endereco:e.target.value})} placeholder="Rua Exemplo, 123" />
              {errors.endereco && <small className="error">{errors.endereco}</small>}
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
              <div className="field">
                <label>Cidade</label>
                <input className={errors.cidade ? 'error':''} value={form.cidade} onChange={e=>setForm({...form, cidade:e.target.value})} placeholder="São Paulo" />
                {errors.cidade && <small className="error">{errors.cidade}</small>}
              </div>
              <div className="field">
                <label>CEP</label>
                <input className={errors.cep ? 'error':''} value={form.cep} onChange={e=>setForm({...form, cep: maskCEP(e.target.value)})} placeholder="00000-000" />
                {errors.cep && <small className="error">{errors.cep}</small>}
              </div>
            </div>
            <button type="submit" style={{background:'var(--primary)', color:'white', border:'none', padding:'10px 12px', borderRadius:8}}>Ir para pagamento</button>
          </div>
        </form>
      </div>
      <Footer/>
    </>
  )
}
