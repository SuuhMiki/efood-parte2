import Header from '../components/Header'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function Carrinho(){
  const { items, inc, dec, removeItem, total } = useCart()
  const navigate = useNavigate()

  return (
    <>
      <Header/>
      <div style={{maxWidth:720, margin:'24px auto', padding:'0 16px'}}>
        <h2>Seu carrinho</h2>
        {items.length === 0 && <p style={{marginTop:8}}>Carrinho vazio.</p>}
        <div style={{display:'grid', gap:10, marginTop:12}}>
          {items.map((i)=> (
            <div key={i.id} style={{display:'grid', gridTemplateColumns:'80px 1fr auto', alignItems:'center', gap:10, background:'var(--card)', padding:10, borderRadius:10}}>
              <img src={i.image} width="80" height="80" style={{borderRadius:8, objectFit:'cover'}}/>
              <div>
                <div style={{fontWeight:700}}>{i.name}</div>
                <div style={{display:'flex', alignItems:'center', gap:8}}>
                  <button onClick={()=>dec(i.id)}>-</button>
                  <span>{i.qty}</span>
                  <button onClick={()=>inc(i.id)}>+</button>
                  <button onClick={()=>removeItem(i.id)} style={{marginLeft:8}}>remover</button>
                </div>
              </div>
              <strong>R$ {(i.price*i.qty).toFixed(2)}</strong>
            </div>
          ))}
        </div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:16, fontWeight:800}}>
          <span>Total</span><span>R$ {total.toFixed(2)}</span>
        </div>
        <button disabled={!items.length} onClick={()=>navigate('/entrega')} style={{marginTop:12, background:'var(--primary)', color:'white', padding:'10px 12px', border:'none', borderRadius:10, fontWeight:800}}>Continuar para entrega</button>
      </div>
      <Footer/>
    </>
  )
}
