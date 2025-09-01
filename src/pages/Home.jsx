import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
const Logo = styled.img`
  height: 72px;
  margin-bottom: 24px;
`
import styled from 'styled-components'
import Footer from '../components/Footer'
import Card from '../components/Card'

const Hero = styled.section`
  background: #ffe5dc;
  min-height: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 40px;
  padding-bottom: 0;
  border: none;
  text-align: center;
  .logo {
    background: transparent;
    border: none;
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    height: 72px;
    margin-bottom: 64px;
    box-sizing: border-box;
  }
  .hero-title {
    color: #e66767;
    font-size: 2.5rem;
    font-weight: 800;
    line-height: 1.15;
    margin: 0;
    text-shadow: none;
    margin-top: 0;
    margin-bottom: 0;
    letter-spacing: 0.5px;
  }
  @media (min-width: 600px) {
    .hero-title {
      font-size: 2.7rem;
    }
    .logo {
      height: 80px;
      margin-bottom: 72px;
    }
  }
`

const Grid = styled.div`
  max-width: 1100px;
  margin: 40px auto 24px auto;
  padding: 0 16px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
  gap: 32px 18px;
`

export default function Home() {
  // Dados mockados para exibir igual à imagem
  const [restaurantes, setRestaurantes] = useState([])

  useEffect(() => {
    fetch('https://ebac-fake-api.vercel.app/api/efood/restaurantes')
      .then((res) => res.json())
      .then((data) => setRestaurantes(data))
  }, [])

  return (
    <>
      <Hero>
        <div className="logo">
          <Logo src={logo} alt="efood logo" />
        </div>
        <h1 className="hero-title">
          Viva experiências gastronômicas
          <br />
          no conforto da sua casa
        </h1>
      </Hero>
      <Grid>
        {restaurantes.length === 0 ? (
          <div
            style={{
              gridColumn: '1/-1',
              textAlign: 'center',
              color: '#e66767',
              fontWeight: 700,
              fontSize: 20,
              padding: 40
            }}
          >
            Nenhum restaurante encontrado.
          </div>
        ) : (
          restaurantes.map((r, idx) => (
            <Card
              key={r.id || idx}
              id={r.id}
              capa={r.capa}
              nome={r.nome || r.titulo || 'Restaurante'}
              tipo={r.tipo}
              destaque={r.destacado}
              nota={r.avaliacao || r.nota}
              descricao={r.descricao}
            />
          ))
        )}
      </Grid>
      <Footer />
    </>
  )
}
