import Header from '../components/Header'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Confirmacao(){
  const { delivery, payment, orderId, clear } = useCart()

  useEffect(()=>{
    // limpa carrinho ao entrar aqui
    clear()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Header/>
      <div style={{maxWidth:720, margin:'24px auto', padding:'0 16px'}}>
        <h2>Pedido confirmado 🎉</h2>
        <p style={{marginTop:8}}>Número do pedido: <strong>{orderId}</strong></p>
        {delivery && (
          <div style={{marginTop:12}}>
            <h3>Entrega</h3>
            <p>{delivery.nome} · {delivery.endereco}, {delivery.cidade} · {delivery.cep}</p>
          </div>
        )}
        {payment && (
          <div style={{marginTop:12}}>
            <h3>Pagamento</h3>
            <p>Cartão final {String(payment.numero).slice(-4)} · Total R$ {payment.total?.toFixed(2)}</p>
          </div>
        )}
        <Link to="/" style={{display:'inline-block', marginTop:16}}>Voltar para a Home</Link>
      </div>
      <Footer/>
    </>
  )
}
