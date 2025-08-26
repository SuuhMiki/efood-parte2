import styled from 'styled-components'

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Sheet = styled.div`
  background: white;
  width: min(180px, 92vw); // modal mais estreito
  border-radius: 12px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <Backdrop onClick={onClose}>
      <Sheet onClick={(e) => e.stopPropagation()}>{children}</Sheet>
    </Backdrop>
  )
}
