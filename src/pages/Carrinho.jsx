import React from 'react'
import CartSidebar from '../components/CartSidebar'
import { useNavigate } from 'react-router-dom'

export default function Carrinho() {
  const navigate = useNavigate()
  return <CartSidebar onClose={() => navigate(-1)} />
}
