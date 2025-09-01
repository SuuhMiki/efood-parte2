import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const CardContainer = styled.div`
  background: #fff;
  border: 2px solid #ffe5dc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  position: relative;
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
  }
  .tags {
    position: absolute;
    top: 12px;
    left: 12px;
    display: flex;
    gap: 8px;
    z-index: 2;
  }
  .tag {
    background: #e66767;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    border-radius: 4px;
    padding: 2px 10px;
    margin-right: 4px;
    display: inline-block;
  }
  .content {
    padding: 18px 16px 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2px;
  }
  .name {
    color: #e66767;
    font-size: 20px;
    font-weight: 700;
    margin: 0;
    line-height: 1.1;
  }
  .rating {
    color: #e66767;
    font-size: 17px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .star {
    color: #ffb800;
    font-size: 18px;
    margin-left: 2px;
  }
  .desc {
    color: rgba(230, 103, 103, 1);
    font-size: 15px;
    margin: 0 0 8px 0;
    line-height: 1.4;
  }
  .button {
    background: #e66767;
    color: #fff;
    font-weight: 700;
    border: none;
    border-radius: 4px;
    padding: 7px 18px;
    font-size: 15px;
    margin-top: 4px;
    align-self: flex-start;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.2s;
  }
  .button:hover {
    background: #c94d4d;
  }
`

// Exemplo de props esperadas: { id, capa, nome, tipo, destaque, nota, descricao }
export default function Card({
  id,
  capa,
  nome,
  tipo,
  destaque,
  nota,
  descricao
}) {
  return (
    <CardContainer>
      <div style={{ position: 'relative' }}>
        <img src={capa} alt={nome} />
        <div className="tags">
          {destaque && (
            <span
              className="tag"
              style={{
                background: '#e66767',
                color: '#fff',
                fontWeight: 700,
                fontSize: 13,
                borderRadius: 32,
                padding: '8px 22px',
                marginRight: 4,
                letterSpacing: 1,
                fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
              }}
            >
              Destaque da casa
            </span>
          )}
          {tipo && (
            <span
              className="tag"
              style={{
                borderRadius: 32,
                padding: '8px 22px',
                fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
                fontWeight: 700
              }}
            >
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </span>
          )}
        </div>
      </div>
      <div className="content">
        <div className="row">
          <span className="name">{nome}</span>
          {nota && (
            <span className="rating">
              {nota} <span className="star">★</span>
            </span>
          )}
        </div>
        <p className="desc">{descricao}</p>
        <Link className="button" to={`/restaurante/${id}`}>
          Saiba mais
        </Link>
      </div>
    </CardContainer>
  )
}
