/* Este archivo será el cerebro del juego.Se encargará de:
- crear el mazo de cartas
- mezclar las cartas
- guardar el estado del juego
- iniciar la partida
Más adelante también manejará:
- comprobación de parejas
- movimientos
- victoria */

import { renderBoard, updateCard, updateMoves, showVictoryScreen, celebrateBoard } from "./board.js"
import.meta.env.BASE_URL
const base = import.meta.env.BASE_URL

// Estado global del juego
const gameState = {
  cards: [],
  flippedCards: [],
  moves: 0,
  lockBoard: false
}

// Definimos las cartas únicas que usaremos en el juego
const baseCards = [
  { pairId: 1, image: `${base}images/1.jpeg` },
  { pairId: 2, image: `${base}images/2.jpg` },
  { pairId: 4, image: `${base}images/4.jpg` },
  { pairId: 5, image: `${base}images/5.jpg` },
  { pairId: 6, image: `${base}images/6.jpg` },
  { pairId: 7, image: `${base}images/7.jpg` },
  { pairId: 8, image: `${base}images/8.jpg` },
  { pairId: 9, image: `${base}images/9.jpg` },
  { pairId: 10, image: `${base}images/10.jpg` },
  { pairId: 12, image: `${base}images/12.jpg` },
  { pairId: 13, image: `${base}images/13.jpg` },
  { pairId: 14, image: `${base}images/14.jpg` },
  { pairId: 16, image: `${base}images/16.jpg` },
  { pairId: 17, image: `${base}images/17.jpg` },
  { pairId: 18, image: `${base}images/18.jpg` },
  { pairId: 19, image: `${base}images/19.jpg` },
  { pairId: 20, image: `${base}images/20.jpg` },
  { pairId: 21, image: `${base}images/21.jpg` },
  { pairId: 23, image: `${base}images/23.jpg` },
  { pairId: 24, image: `${base}images/24.jpg` },
  { pairId: 25, image: `${base}images/25.jpg` },
  { pairId: 26, image: `${base}images/26.jpg` },
  { pairId: 27, image: `${base}images/27.jpg` },
  { pairId: 28, image: `${base}images/28.jpg` },
  { pairId: 29, image: `${base}images/29.jpg` },
  { pairId: 30, image: `${base}images/30.jpg` },
  { pairId: 31, image: `${base}images/31.jpg` },
  { pairId: 32, image: `${base}images/32.jpg` }
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
  // Pre-cargamos las imágenes para evitar retrasos al voltear las cartas
  baseCards.forEach(card => {
    const img = new Image()
    img.src = card.image
  })
  // Creamos el mazo de cartas
  const deck = createDeck()
  // Mezclamos el mazo
  const shuffledDeck = shuffleDeck(deck)
  // Guardamos el mazo mezclado en el estado del juego
  gameState.cards = shuffledDeck
  // Reiniciamos el contador de movimientos y las cartas volteadas
  gameState.moves = 0
  gameState.flippedCards = []
  // Renderizamos el tablero vacío al iniciar el juego
  renderBoard(gameState.cards)

  updateMoves(gameState.moves)
}

// Función para manejar la selección de una carta
export function handleCardSelection(cardId) {
  // Aquí podríamos agregar la lógica para voltear la carta, verificar si es un match, etc.
  const card = gameState.cards.find(c => c.id === cardId)

  // si el tablero está bloqueado, no hacemos nada
  if (gameState.lockBoard) return null

  // si la carta ya está volteada, ignoramos el click
  if (card.flipped) return null

  // Volteamos la carta
  card.flipped = true
  updateCard(card)
  gameState.flippedCards.push(card)

  // si hay dos cartas abiertas comprobamos
  if (gameState.flippedCards.length === 2) {
    gameState.lockBoard = true
    gameState.moves++
    updateMoves(gameState.moves)
    checkForMatch()
  }
  return card
}

// Función para comprobar si las dos cartas volteadas son pareja
function checkForMatch() {
  // obtenemos las dos cartas volteadas
  const [firstCard, secondCard] = gameState.flippedCards
  if (firstCard.pairId === secondCard.pairId) {
    handleMatch()
  } else {
    handleMismatch()
  }
}

// Si las cartas coinciden, las marcamos como emparejadas
function handleMatch() {
  gameState.flippedCards.forEach(card => {
    card.matched = true
    updateCard(card)
  })
  resetTurn()
  checkVictory()
}

// Si no coinciden, las volteamos de nuevo después de un breve retraso
function handleMismatch() {
  setTimeout(() => {
    gameState.flippedCards.forEach(card => {
      card.flipped = false
      updateCard(card)
    })
    resetTurn()
  }, 1450)
}

// Reiniciamos el turno después de comprobar las cartas
function resetTurn() {
  gameState.flippedCards = []
  gameState.lockBoard = false
  // Aquí podríamos agregar lógica para verificar si el juego ha terminado (todas las cartas emparejadas)
}

function checkVictory() {

  if (gameState.cards.length === 0) return

  const allMatched = gameState.cards.every(card => card.matched)

  if (allMatched) {
    handleVictory()
  }

}

function handleVictory() {

  celebrateBoard()

  setTimeout(() => {
    showVictoryScreen(gameState.moves)
  }, 700)
}