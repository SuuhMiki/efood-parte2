import React, { useState } from 'react'
import CartSidebar from '../components/CartSidebar'

export default function Carrinho() {
  const [open, setOpen] = useState(true)
  if (!open) return null
  return <CartSidebar onClose={() => setOpen(false)} />
}
