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
  // cada carta es un div con una imagen dentro
  const cardElement = document.createElement("div")
  cardElement.classList.add("card")
  const img = document.createElement("img")
  img.src = card.image
  cardElement.appendChild(img)
  return cardElement
}