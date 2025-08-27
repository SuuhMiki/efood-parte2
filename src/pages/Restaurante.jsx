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
  width: 100%;
  height: 220px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: #fff;
  background: ${({ bg }) =>
    `linear-gradient(0deg, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.2) 100%), url('${bg}') center/cover no-repeat`};
  padding: 0 0 32px 40px;
  box-sizing: border-box;
  overflow: hidden;
`

const Grid = styled.div`
  max-width: 1024px;
  margin: 24px auto;
  padding: 0 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 18px;
`
const ModalBg = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`
const ModalBox = styled.div`
  background: #e66767;
  border-radius: 0;
  padding: 24px 24px 24px 24px;
  min-width: 340px;
  max-width: 900px;
  width: 90vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 32px;
  color: #fff;
  position: relative;
`
const ModalImg = styled.img`
  width: 260px;
  height: 220px;
  object-fit: cover;
  border-radius: 0;
  background: #fff;
`
const ModalContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;
  h3 {
    font-size: 26px;
    font-weight: 700;
    margin: 0 0 8px 0;
    color: #fff;
  }
  p {
    color: #fff;
    font-size: 16px;
    margin: 0 0 8px 0;
    line-height: 1.5;
  }
  .serves {
    color: #ffe5dc;
    font-size: 15px;
    margin-bottom: 12px;
  }
`
const ModalButton = styled.button`
  background: #ffe5dc;
  color: #e66767;
  font-weight: 700;
  border: none;
  border-radius: 0;
  padding: 8px 14px;
  font-size: 16px;
  margin-top: 8px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ffd2c2;
  }
`
const ModalClose = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  opacity: 0.8;
  z-index: 2;
  &:hover {
    opacity: 1;
  }
`

export default function Restaurante() {
  const { id } = useParams()
  const [restaurante, setRestaurante] = useState(null)
  const [produto, setProduto] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    fetch(`https://ebac-fake-api.vercel.app/api/efood/restaurantes/${id}`)
      .then((res) => res.json())
      .then((data) => setRestaurante(data))
  }, [id])

  function addToCart(prato) {
    addItem({
      id: prato.id,
      name: prato.nome,
      price: prato.preco,
      image: prato.foto
    })
    setCartOpen(true)
  }

  if (!restaurante) return <p>Carregando...</p>

  return (
    <>
      <Header />
      <Banner bg={restaurante.capa}>
        <div
          style={{
            fontSize: 22,
            fontWeight: 400,
            opacity: 0.9,
            marginBottom: 8
          }}
        >
          {restaurante.tipo}
        </div>
        <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.1 }}>
          {restaurante.nome}
        </div>
      </Banner>
      <Grid>
        {restaurante.cardapio.map((prato) => (
          <div
            key={prato.id}
            style={{
              background: 'var(--card)',
              border: '1px solid #f0d3cb',
              padding: 12,
              borderRadius: 10
            }}
          >
            <img
              src={prato.foto}
              alt={prato.nome}
              style={{
                width: '100%',
                height: 160,
                objectFit: 'cover',
                borderRadius: 8
              }}
            />
            <div style={{ display: 'grid', gap: 6, marginTop: 10 }}>
              <strong>{prato.nome}</strong>
              <small style={{ opacity: 0.8 }}>{prato.descricao}</small>
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
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalClose onClick={() => setProduto(null)} aria-label="Fechar">
              ×
            </ModalClose>
            <ModalImg
              src={
                produto.foto && produto.foto !== ''
                  ? produto.foto
                  : '/src/assets/pizza.jpg'
              }
              alt={produto.nome}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = '/src/assets/pizza.jpg'
              }}
            />
            <ModalContent>
              <h3>{produto.nome}</h3>
              <p>{produto.descricao}</p>
              <div className="serves">Serve: de 2 a 3 pessoas</div>
              <ModalButton
                onClick={() => {
                  addToCart(produto)
                  setProduto(null)
                }}
              >
                Adicionar ao carrinho - R${' '}
                {Number(produto.preco).toFixed(2).replace('.', ',')}
              </ModalButton>
            </ModalContent>
          </ModalBox>
        </ModalBg>
      )}

      {cartOpen && <CartSidebar onClose={() => setCartOpen(false)} />}
    </>
  )
}
