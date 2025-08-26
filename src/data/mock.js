export const restaurantes = [
  {
    id: 1,
    nome: 'Itali Sushi',
    capa: '/src/assets/sushi.jpg',
    descricao: 'Sushi fresquinho e temaki caprichado.',
    pratos: [
      { id: 101, nome:'Sushi Combo', preco: 32.9, foto:'/src/assets/sushi.jpg', descricao:'Seleção de sushis clássicos.' },
      { id: 102, nome:'Temaki Salmão', preco: 24.9, foto:'/src/assets/sushi.jpg', descricao:'Temaki de salmão com cream cheese.' },
    ]
  },
  {
    id: 2,
    nome: 'La Dolce Vita Trattoria',
    capa: '/src/assets/massa.jpg',
    descricao: 'Massas artesanais e pizzas assadas no forno.',
    pratos: [
      { id: 201, nome:'Pizza Margherita', preco: 45.0, foto:'/src/assets/pizza.jpg', descricao:'Molho de tomate, muçarela e manjericão.' },
      { id: 202, nome:'Spaghetti alla Carbonara', preco: 39.0, foto:'/src/assets/massa.jpg', descricao:'Clássico romano cremoso.' },
      { id: 203, nome:'Lasagna', preco: 42.0, foto:'/src/assets/massa.jpg', descricao:'Bolonhesa, bechamel e muito queijo.' },
    ]
  }
]
