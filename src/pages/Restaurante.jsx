import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import CartSidebar from '../components/CartSidebar'
import { restaurantes } from '../data/mock'
import { useCart } from '../context/CartContext'

const Banner = styled.div`
  height: 180px; display:grid; align-items:end; color:white; padding:16px;
  background: center/cover no-repeat url('/src/assets/massa.jpg'), linear-gradient(180deg, rgba(0,0,0,.4), rgba(0,0,0,.4));
  position: relative;
`

const Grid = styled.div`
  max-width: 1024px; margin: 24px auto; padding: 0 16px;
  display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px;
`
const ModalBg = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,.6); display: flex; align-items: center; justify-content: center; z-index: 100;
`
const ModalBox = styled.div`
  background: white;
  border-radius: 12px;
  padding: 8px;
  min-width: 120px;
  max-width: 220px; // Modal bem estreito
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default function Restaurante() {
  const { id } = useParams()
  const [restaurante, setRestaurante] = useState(null)
  const [produto, setProduto] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    fetch(`https://ebac-fake-api.vercel.app/api/efood/restaurantes/${id}`)
      .then(res => res.json())
      .then(data => setRestaurante(data))
  }, [id])

  function addToCart(prato){
    addItem({ id: prato.id, name: prato.nome, price: prato.preco, image: prato.foto })
    setCartOpen(true)
  }

  if (!restaurante) return <p>Carregando...</p>

  return (
    <>
      <Header />
      <Banner>
        <h2 style={{textShadow:'0 2px 6px rgba(0,0,0,.6)'}}>{restaurante.nome}</h2>
      </Banner>
      <Grid>
        {restaurante.cardapio.map(prato => (
          <div key={prato.id} style={{ background: 'var(--card)', border: '1px solid #f0d3cb', padding: 12, borderRadius: 10 }}>
            <img src={prato.foto} alt={prato.nome} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 8 }} />
            <div style={{ display: 'grid', gap: 6, marginTop: 10 }}>
              <strong>{prato.nome}</strong>
              <small style={{ opacity: .8 }}>{prato.descricao}</small>
              <button
                type="button"
                style={{
                  justifySelf: 'start',
                  background: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: 8,
                  cursor: 'pointer'
                }}
                onClick={() => setProduto(prato)}
              >
                Comprar produto
              </button>
            </div>
          </div>
        ))}
      </Grid>
      <Footer />

      {produto && (
        <ModalBg onClick={() => setProduto(null)}>
          <ModalBox onClick={e => e.stopPropagation()}>
            <h3>{produto.nome}</h3>
            <img src={produto.foto} alt={produto.nome} style={{ width: '100%', borderRadius: 8 }} />
            <p>{produto.descricao}</p>
            <p><b>Preço:</b> R$ {Number(produto.preco).toFixed(2)}</p>
            <button
              style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '10px 16px', borderRadius: 8, marginTop: 12, cursor: 'pointer' }}
              onClick={() => { addToCart(produto); setProduto(null) }}
            >
              Adicionar ao carrinho
            </button>
          </ModalBox>
        </ModalBg>
      )}

      {cartOpen && <CartSidebar onClose={()=>setCartOpen(false)} />}
    </>
  )
}
