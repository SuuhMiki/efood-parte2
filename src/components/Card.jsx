import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const CardContainer = styled.div`
  background: white;
  border: 1px solid #f0d3cb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: 170px;
    object-fit: cover;
  }
  .content {
    padding: 12px 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  h3 {
    font-size: 18px;
  }
  p {
    font-size: 14px;
    opacity: 0.9;
  }
  a {
    align-self: flex-start;
    border: none;
    background: var(--primary);
    color: white;
    padding: 8px 12px;
    border-radius: 8px;
    font-weight: 700;
    text-decoration: none;
  }
`

export default function Card({ id, capa, titulo, tipo }) {
  return (
    <CardContainer>
      <img src={capa} alt={titulo} />
      <div className="content">
        <h3>{titulo}</h3>
        <p>{tipo}</p>
        <Link to={`/restaurante/${id}`}>Ver cardápio</Link>
      </div>
    </CardContainer>
  )
}
