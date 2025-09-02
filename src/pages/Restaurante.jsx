import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../assets/logo.png'
const PratoCard = styled.div`
  background: rgba(230, 103, 103, 1);
  border: 2px solid #e66767;
  padding: 18px;
  border-radius: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  min-height: 420px;
  align-items: center;
  width: 320px;
  justify-content: flex-start;
  box-sizing: border-box;
`
// Styled-components ausentes
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
  max-width: 1100px;
  width: 100%;
  margin: 40px auto 32px auto;
  padding: 0 16px;
  justify-items: center;
  align-items: stretch;
`
const ModalBox = styled.div`
  background: #e66767;
  border-radius: 0;
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  padding: 24px;
  z-index: 1001;
`

const ModalImg = styled.img`
  width: 320px;
  height: 320px;
  object-fit: cover;
  background: #eee;
  border-radius: 0;
`

const ModalContent = styled.div`
  flex: 1;
  padding: 0 0 0 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h3 {
    font-size: 28px;
    color: #fff;
    margin-bottom: 12px;
    font-weight: 800;
  }
  p {
    color: #fff;
    font-size: 18px;
    margin-bottom: 18px;
    line-height: 1.4;
  }
  .serves {
    color: #fff;
    font-size: 16px;
    margin-bottom: 18px;
    font-weight: 400;
  }
`

import Footer from '../components/Footer'
import Modal from '../components/Modal'
import CartSidebar from '../components/CartSidebar'
import { restaurantes } from '../data/mock'
import { useCart } from '../context/CartContext'
import OverlayBg from '../components/OverlayBg'
import Entrega from './Entrega'

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
  padding: 0 0 32px 24px;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  box-sizing: border-box;
  margin: 0 auto 0 auto;
  .banner-type {
    font-size: 22px;
    font-weight: 400;
    opacity: 0.9;
    margin-bottom: 8px;
    text-align: left;
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
  }
  .banner-name {
    font-size: 32px;
    font-weight: 800;
    line-height: 1.1;
    text-align: left;
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
  }
`
const ModalButton = styled.button`
  background: #ffe5d9;
  color: #e66767;
  font-weight: 700;
  border: none;
  border-radius: 0;
  padding: 8px 14px;
  font-size: 16px;
  margin-top: 8px;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: none;
  outline: none;
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
  const navigate = useNavigate()
  const [restaurante, setRestaurante] = useState(null)
  const [produto, setProduto] = useState(null)
  // Controle único para barra lateral
  const [sidebar, setSidebar] = useState(null) // 'cart', 'entrega', 'pagamento', 'checkout'
  const { addItem, items } = useCart()

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
    navigate(`/restaurante/${id}/carrinho`)
  }

  if (!restaurante) return <p>Carregando...</p>

  return (
    <>
      {/* OverlayBg removido daqui, pois é responsabilidade do OverlayRoutes nas rotas de overlay */}
      {!sidebar && (
        <>
          <div
            style={{
              width: '100%',
              left: 0,
              top: 0,
              zIndex: 200,
              background: '#ffecdf',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto'
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: '0 auto',
                height: '100%',
                position: 'relative'
              }}
            >
              <span
                style={{
                  color: '#e66767',
                  fontWeight: 700,
                  fontSize: 20,
                  marginLeft: 40,
                  fontFamily: 'inherit',
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/')}
                role="button"
                tabIndex={0}
              >
                Restaurantes
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 80,
                  background: 'transparent',
                  margin: '0 auto'
                }}
              >
                <img src={logo} alt="efood logo" style={{ height: 48 }} />
              </div>
              <span
                style={{
                  color: '#e66767',
                  fontWeight: 700,
                  fontSize: 20,
                  marginRight: 40,
                  fontFamily: 'inherit',
                  cursor: 'pointer'
                }}
                onClick={() => navigate(`/restaurante/${id}/carrinho`)}
                role="button"
                tabIndex={0}
              >
                {items.length} produto(s) no carrinho
              </span>
            </div>
          </div>
          <Banner bg={restaurante.capa}>
            <div
              className="banner-type"
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontWeight: 400,
                fontSize: 22,
                marginBottom: 8,
                marginTop: 0,
                textShadow: '0 1px 2px rgba(0,0,0,0.12)'
              }}
            >
              {restaurante.tipo}
            </div>
            <div
              className="banner-name"
              style={{
                color: 'rgba(255,255,255,1)',
                fontWeight: 800,
                fontSize: 32,
                lineHeight: 1.1,
                textShadow: '0 1px 2px rgba(0,0,0,0.18)'
              }}
            >
              {restaurante.titulo || restaurante.nome}
            </div>
          </Banner>
          <Grid>
            {Array.isArray(restaurante.cardapio) &&
            restaurante.cardapio.length > 0 ? (
              restaurante.cardapio.map((prato) => (
                <PratoCard key={prato.id}>
                  <img
                    src={prato.foto}
                    alt={prato.nome}
                    style={{
                      width: '100%',
                      height: 180,
                      objectFit: 'cover',
                      borderRadius: 0,
                      marginBottom: 0
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                      marginTop: 10,
                      flex: 1,
                      width: '100%',
                      justifyContent: 'flex-start'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 2
                      }}
                    >
                      <span
                        style={{
                          color: 'rgba(255, 235, 217, 1)',
                          fontSize: 18,
                          fontWeight: 700
                        }}
                      >
                        {prato.nome}
                      </span>
                      <span
                        style={{
                          color: '#e66767',
                          fontSize: 16,
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2
                        }}
                      >
                        {Number(prato.avaliacao || prato.nota).toFixed(1)}{' '}
                        <span
                          style={{
                            color: '#ffb800',
                            fontSize: 18,
                            marginLeft: 2
                          }}
                        >
                          ★
                        </span>
                      </span>
                    </div>
                    <div
                      style={{
                        background: 'rgba(230, 103, 103, 1)',
                        color: '#fff',
                        fontSize: 15,
                        margin: 0,
                        lineHeight: 1.4,
                        marginBottom: 8,
                        borderRadius: 4,
                        padding: '8px 10px'
                      }}
                    >
                      {prato.descricao}
                    </div>
                  </div>
                  <button
                    type="button"
                    style={{
                      background: '#ffe5d9',
                      color: '#e66767',
                      fontWeight: 700,
                      border: 'none',
                      borderRadius: 0,
                      padding: '8px 14px',
                      fontSize: 16,
                      marginTop: 'auto',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                      boxShadow: 'none',
                      outline: 'none',
                      width: '100%'
                    }}
                    onClick={() => addToCart(prato)}
                  >
                    Adicionar ao carrinho
                  </button>
                </PratoCard>
              ))
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  padding: 40
                }}
              >
                Nenhum prato encontrado para este restaurante.
              </div>
            )}
          </Grid>
          <Footer />
          {/* Modal de produto só aparece se não estiver em modo overlay (sidebar) */}
          {!sidebar && produto && (
            <OverlayBg onClick={() => setProduto(null)}>
              <ModalBox onClick={(e) => e.stopPropagation()}>
                <ModalClose
                  onClick={() => setProduto(null)}
                  aria-label="Fechar"
                >
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
            </OverlayBg>
          )}
        </>
      )}

      {sidebar === 'cart' && (
        <CartSidebar
          onClose={() => setSidebar(null)}
          onNext={() => setSidebar('entrega')}
        />
      )}
      {sidebar === 'entrega' && (
        <Entrega
          onClose={() => navigate(`/restaurante/${id}`)}
          onNext={() => setSidebar('pagamento')}
        />
      )}
      {sidebar === 'pagamento' && (
        <Pagamento
          onClose={() => setSidebar(null)}
          onNext={() => setSidebar('checkout')}
        />
      )}
      {sidebar === 'checkout' && (
        <Confirmacao onClose={() => setSidebar(null)} />
      )}
    </>
  )
}
