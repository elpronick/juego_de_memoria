import { handleCardSelection, initializeGame } from "./game.js"

const restartBtn = document.getElementById("restart-btn")

if (restartBtn) {

  restartBtn.addEventListener("click", () => {

    document.getElementById("victory-screen").classList.add("hidden")

    initializeGame()

  })

}


// Obtenemos el tablero del DOM
const boardElement = document.getElementById("board")

/// funcion principal: renderBoard, que se encargará de mostrar las cartas en el tablero
export function renderBoard(cards) {

  // limpiamos el tablero antes de renderizar
  boardElement.innerHTML = ""
  cards.forEach(card => {
    const cardElement = createCardElement(card)
    boardElement.appendChild(cardElement)
  })
}

// función para crear el elemento HTML de cada carta
function createCardElement(card) {

  const cardElement = document.createElement("div")
  cardElement.classList.add("card")
  cardElement.dataset.id = card.id

  // solo mostrar imagen si está flipped
  if (card.flipped || card.matched) {

    const img = document.createElement("img")
    img.src = card.image
    cardElement.appendChild(img)
  }
  cardElement.addEventListener("click", handleCardClick)
  return cardElement
}

// función para manejar el click en una carta
function handleCardClick(event) {
  
  // obtenemos el id de la carta clicada desde el dataset
  const cardElement = event.currentTarget
  // aquí podríamos agregar lógica para voltear la carta, verificar si es un match, etc.
  const cardId = cardElement.dataset.id
  // llamamos a la función del juego para manejar la selección de la carta
  const card = handleCardSelection(cardId)

  // si el click no es válido, salimos
  if (!card) return
  // actualizar interfaz
  cardElement.classList.add("flipped")
}

export function updateCard(card) {

  const cardElement = document.querySelector(`[data-id="${card.id}"]`)

  if (!cardElement) return

  const img = cardElement.querySelector("img")

  if (card.flipped || card.matched) {

    if (!img) {
      const newImg = document.createElement("img")
      newImg.src = card.image
      cardElement.appendChild(newImg)
    }

    cardElement.classList.add("flipped")

  } else {

    if (img) img.remove()

    cardElement.classList.remove("flipped")

  }

  if (card.matched) {
    cardElement.classList.add("matched")
  }
}

export function updateMoves(moves) {

  const movesElement = document.getElementById("moves")

  if (!movesElement) return

  movesElement.textContent = moves

}

export function showVictoryScreen(moves) {

  const screen = document.getElementById("victory-screen")
  const movesText = document.getElementById("final-moves")

  movesText.textContent = moves

  screen.classList.remove("hidden")

}

export function celebrateBoard() {

  const board = document.getElementById("board")

  if (!board) return

  board.classList.add("celebrating")

  setTimeout(() => {
    board.classList.remove("celebrating")
  }, 600)
}