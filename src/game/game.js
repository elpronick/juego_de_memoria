/* Este archivo será el cerebro del juego.Se encargará de:
- crear el mazo de cartas
- mezclar las cartas
- guardar el estado del juego
- iniciar la partida
Más adelante también manejará:
- comprobación de parejas
- movimientos
- victoria */

// Estado global del juego
const gameState = {
  cards: [],
  flippedCards: [],
  moves: 0,
  lockBoard: false
}

// Definimos las cartas únicas que usaremos en el juego
const baseCards = [
  { pairId: 1, image: "/src/images/1.jpeg" },
  { pairId: 2, image: "/src/images/2.jpg" },
  { pairId: 3, image: "/src/images/3.jpeg" },
  { pairId: 4, image: "/src/images/4.jpg" },
  { pairId: 5, image: "/src/images/5.jpg" },
  { pairId: 6, image: "/src/images/6.jpg" },
  { pairId: 7, image: "/src/images/7.jpg" },
  { pairId: 8, image: "/src/images/8.jpg" },
  { pairId: 9, image: "/src/images/9.jpg" },
  { pairId: 10, image: "/src/images/10.jpg" },
  { pairId: 11, image: "/src/images/11.jpg" },
  { pairId: 12, image: "/src/images/12.jpg" },
  { pairId: 13, image: "/src/images/13.jpg" },
  { pairId: 14, image: "/src/images/14.jpg" },
  { pairId: 15, image: "/src/images/15.jpg" },
  { pairId: 16, image: "/src/images/16.jpg" },
  { pairId: 17, image: "/src/images/17.jpg" },
  { pairId: 18, image: "/src/images/18.jpg" },
  { pairId: 19, image: "/src/images/19.jpg" },
  { pairId: 20, image: "/src/images/20.jpg" },
  { pairId: 21, image: "/src/images/21.jpg" },
  { pairId: 22, image: "/src/images/22.jpg" },
  { pairId: 23, image: "/src/images/23.jpg" },
  { pairId: 24, image: "/src/images/24.jpg" },
  { pairId: 25, image: "/src/images/25.jpg" },
  { pairId: 26, image: "/src/images/26.jpg" },
  { pairId: 27, image: "/src/images/27.jpg" },
  { pairId: 28, image: "/src/images/28.jpg" },
  { pairId: 29, image: "/src/images/29.jpg" },
  { pairId: 30, image: "/src/images/30.jpg" },
  { pairId: 31, image: "/src/images/31.jpg" },
  { pairId: 32, image: "/src/images/32.jpg" },
  { pairId: 33, image: "/src/images/33.jpg" }
]

// Hacemos una función que genere las cartas del tablero.
function createDeck() {
  // el mazo final que se usará en el juego
  const deck = []
  // por cada carta base, creamos dos cartas para el juego
  baseCards.forEach(card => {

    // crear dos cartas por cada imagen
    for (let i = 0; i < 2; i++) {
      // cada carta tendrá un id único, el id de su pareja, la imagen y su estado (si está volteada o emparejada)
      deck.push({
        id: crypto.randomUUID(),
        pairId: card.pairId,
        image: card.image,
        flipped: false,
        matched: false
      })
    }
  })
  return deck
}

// Mezclar las cartas
function shuffleDeck(deck) {
  // Usamos el método sort con una función aleatoria para mezclar el mazo
  return deck.sort(() => Math.random() - 0.5)
}

// Iniciar el juego
export function initializeGame() {
  // Creamos el mazo de cartas
  const deck = createDeck()
  // Mezclamos el mazo
  const shuffledDeck = shuffleDeck(deck)
  // Guardamos el mazo mezclado en el estado del juego
  gameState.cards = shuffledDeck
  // Reiniciamos el contador de movimientos y las cartas volteadas
  gameState.moves = 0
  gameState.flippedCards = []
  console.log(gameState.cards)
}