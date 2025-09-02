import styled from 'styled-components'

const Wrap = styled.footer`
  width: 100%;
  background: #ffecdf;
  padding: 24px 0 12px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #e66767;
  font-family: inherit;
`

const Logo = styled.img`
  height: 48px;
  margin-bottom: 16px;
`

const Socials = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  img {
    width: 32px;
    height: 32px;
    filter: grayscale(0) brightness(1) sepia(1) hue- r otate(-200deg)
      saturate(4) opacity(0.7) 0;
    transition: opacity 0.2s;
    cursor: pointer;
  }
  img:hover {
    opacity: 1;
  }
`

const Desc = styled.div`
  font-size: 13px;
  color: #e66767;
  margin-top: 8px;
  max-width: 600px;
  text-align: center;
`

import logo from '../assets/logo.png'
import redes from '../assets/redes sociais.png'

export default function Footer() {
  return (
    <Wrap>
      <Logo src={logo} alt="efood logo" />
      <img
        src={redes}
        alt="Redes sociais"
        style={{ marginBottom: 32, marginTop: 8, width: 88, height: 24 }}
      />
      <Desc>
        A efood é uma plataforma para divulgação de estabelecimentos, a
        responsabilidade pela entrega, qualidade dos produtos é toda do
        estabelecimento contratado.
      </Desc>
    </Wrap>
  )
}
