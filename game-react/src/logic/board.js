import { WINNER_COMBOS } from '../constants.js'
  
export const checkWinnerFrom = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] && // X o O
        boardToCheck[a] === boardToCheck[b] && 
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    //si no hay ganador
    return null
  }

export const checkEndGame = (boardToCheck) => {
    //si hay un null en el tablero, no hay empate
    return boardToCheck.every((square) => square !== null)
  }