import styled from 'styled-components'

const Wrap = styled.footer`
  margin-top: 48px;
  padding: 40px 16px;
  text-align:center;
  background: var(--card);
  border-top: 2px solid var(--primary);
  color:#7a6b68;
`

export default function Footer(){
  return (
    <Wrap>
      <strong>eFood</strong> · Projeto demo com React, Styled Components e React Router.
    </Wrap>
  )
}
