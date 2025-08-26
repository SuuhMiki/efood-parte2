import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  type Dispatch,
  type SetStateAction
} from 'react'

type CartItem = {
  id: any
  price: number
  qty: number
  [key: string]: any
}

type CartContextType = {
  items: CartItem[]
  addItem: (product: { id: any }) => void
  removeItem: (id: any) => void
  inc: (id: any) => void
  dec: (id: any) => void
  clear: () => void
  total: number
  delivery: any
  setDelivery: Dispatch<SetStateAction<any>>
  payment: any
  setPayment: Dispatch<SetStateAction<any>>
  orderId: any
  setOrderId: Dispatch<SetStateAction<any>>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('efood:cart')
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      return []
    }
  })
  const [delivery, setDelivery] = useState(null)
  const [payment, setPayment] = useState(null)
  const [orderId, setOrderId] = useState(null)

  useEffect(() => {
    localStorage.setItem('efood:cart', JSON.stringify(items))
  }, [items])

  const addItem = (product: { id: any }) => {
    setItems((prev: any[]) => {
      const i = prev.find((p: { id: any }) => p.id === product.id)
      if (i) {
        return prev
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeItem = (id: any) =>
    setItems((prev: any[]) => prev.filter((p: { id: any }) => p.id !== id))
  const inc = (id: any) =>
    setItems((prev: any[]) =>
      prev.map((p: { id: any; qty: number }) =>
        p.id === id ? { ...p, qty: p.qty + 1 } : p
      )
    )
  const dec = (id: any) =>
    setItems((prev: any[]) =>
      prev.map((p: { id: any; qty: number }) =>
        p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p
      )
    )
  const clear = () => setItems([])

  const total = items.reduce(
    (acc: number, i: { price: number; qty: number }) => acc + i.price * i.qty,
    0
  )

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      inc,
      dec,
      clear,
      total,
      delivery,
      setDelivery,
      payment,
      setPayment,
      orderId,
      setOrderId
    }),
    [items, total, delivery, payment, orderId]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
