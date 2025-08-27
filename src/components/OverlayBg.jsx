import styled from 'styled-components'

const OverlayBg = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 10;
  pointer-events: none;
`

export default OverlayBg
