import styled from 'styled-components'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

const Wrap = styled.aside`
  position: fixed; top:0; right:0; height:100dvh; width:min(380px, 92vw);
  background: var(--card); border-left: 3px solid var(--primary);
  padding: 16px; display:flex; flex-direction:column; gap:12px; z-index: 20;
`

export default function CartSidebar({onClose}){
  const { items, inc, dec, removeItem, total } = useCart()
  const navigate = useNavigate()

  return (
    <Wrap>
      <h3>Carrinho</h3>
      <div style={{display:'grid', gap:8, overflowY:'auto'}}>
        {items.length === 0 && <p>Seu carrinho está vazio.</p>}
        {items.map((i, idx) => (
          <div key={idx} style={{display:'grid', gridTemplateColumns:'48px 1fr auto', gap:8, alignItems:'center', background:'white', padding:8, borderRadius:8}}>
            <img src={i.image} width="48" height="48" alt="" style={{borderRadius:6, objectFit:'cover'}}/>
            <div>
              <div style={{fontWeight:700}}>{i.name}</div>
              <div style={{display:'flex', gap:8, alignItems:'center'}}>
                <button onClick={()=>dec(i.id)}>-</button>
                <small>Qtd: {i.qty}</small>
                <button onClick={()=>inc(i.id)}>+</button>
                <button onClick={()=>removeItem(i.id)} style={{marginLeft:8}}>remover</button>
              </div>
            </div>
            <strong>R$ {(i.price*i.qty).toFixed(2)}</strong>
          </div>
        ))}
      </div>
      <div style={{marginTop:'auto', display:'flex', justifyContent:'space-between', fontWeight:800}}>
        <span>Total:</span><span>R$ {total.toFixed(2)}</span>
      </div>
      <button disabled={!items.length} onClick={()=>navigate('/entrega')} style={{background:'var(--primary)', color:'white', textAlign:'center', padding:'10px 12px', border:'none', borderRadius:10, fontWeight:800}}>Continuar para entrega</button>
      <button onClick={onClose} style={{background:'transparent', border:'none'}}>Fechar</button>
    </Wrap>
  )
}
