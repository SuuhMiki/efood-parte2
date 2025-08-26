import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { Link } from 'react-router-dom'

const Hero = styled.section`
  background: url('/src/assets/hero-pattern.png'), var(--card);
  padding: 48px 16px;
  text-align: center;
  border-bottom: 2px solid var(--primary);
  h1 {
    color: #b45858;
    font-size: 20px;
  }
  p {
    margin-top: 10px;
    font-weight: 800;
    color: #b45858;
  }
`

const Grid = styled.div`
  max-width: 1024px;
  margin: 24px auto;
  padding: 0 16px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
`

export default function Home() {
  const [restaurantes, setRestaurantes] = useState([])

  useEffect(() => {
    fetch('https://ebac-fake-api.vercel.app/api/efood/restaurantes')
      .then((res) => res.json())
      .then((data) => setRestaurantes(data))
  }, [])

  return (
    <>
      <Header />
      <Hero>
        <h1>Viva experiências gastronômicas no conforto da sua casa</h1>
        <p>Escolha um restaurante</p>
      </Hero>
      <Grid>
        {restaurantes.map((r) => (
          <Card
            key={r.id}
            id={r.id}
            capa={r.capa}
            titulo={r.titulo}
            tipo={r.tipo}
          />
        ))}
      </Grid>
      <Footer />
    </>
  )
}
