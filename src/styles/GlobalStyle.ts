import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root{
    --primary:#E66767;
    --bg:#FFF8F1;
    --card:#FFE5DC;
    --text:#221F1F;
  }

  *{
    box-sizing: border-box;
    margin:0;
    padding:0;
  }

  body{
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
    background: var(--bg);
    color: var(--text);
  }

  a{
    color: inherit;
    text-decoration: none;
  }

  button{
    cursor:pointer;
  }

  /* Form helpers */
  input, select, textarea{
    padding: 10px 12px;
    border: 1px solid #d9c3bd;
    border-radius: 8px;
    background: #fff;
    outline: none;
    font-size: 14px;
  }

  input:focus{
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(230,103,103,.15);
  }

  input.error{
    border-color: #d32f2f;
    box-shadow: 0 0 0 3px rgba(211,47,47,.15);
  }

  small.error{
    color:#d32f2f;
    margin-top:4px;
    font-size: 12px;
  }

  label{
    font-weight: 600;
    font-size: 14px;
  }

  .field{
    display:grid;
    gap:6px;
  }
`

export default GlobalStyle
