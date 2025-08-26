import styled, { createGlobalStyle } from 'styled-components'

/* Se você já tem um GlobalStyle.ts separado, pode importar ele,
   mas deixei aqui direto para não dar erro */
const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #e66767;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background: #f5f5f5;
    color: #333;
  }
`

const Main = styled.main`
  padding: 2rem;
`

const Title = styled.h1`
  color: var(--primary);
`

const Subtitle = styled.p`
  margin-top: 0.5rem;
`

const FormSection = styled.section`
  margin-top: 2rem;
  max-width: 400px;
  display: grid;
  gap: 6px;
`

function App() {
  return (
    <>
      <GlobalStyle />
      <Main>
        <Title>Bem-vinda ao eFood 🍽️</Title>
        <Subtitle>
          Seu delivery favorito com um toque de sabor e tecnologia.
        </Subtitle>

        <FormSection>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" placeholder="Digite seu e-mail" />
          <small className="error">Este campo é obrigatório</small>
        </FormSection>
      </Main>
    </>
  )
}

export default App
