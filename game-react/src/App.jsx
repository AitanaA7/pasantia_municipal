import { useState } from 'react'
import confetti from 'canvas-confetti'

import './App.css'

import Square from './components/Square'
import { turns } from './constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { saveGameToStorage, resetGameStorage } from './logic/storage'
import { useEffect } from 'react'

function App() {

  const [board, setBoard] = useState(() => {
    //verifico si hay partida guardada en el localStorage
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    //verifico si hay turno guardado en el localStorage
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? turns.X
  })

  //null no hay ganador y false empate
  const [winner, setWinner] = useState(null) 

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(turns.X)
    setWinner(null)

    resetGameStorage() //limpio el localStorage
  }

  const updateBoard = (index) => {
    //no actualizo pos si ya tiene algo
    if (board[index] || winner) {
      return
    }
    //actualizo tablero 
    const newBoard = [...board] //copia del array
    newBoard[index] = turn // X o O
    setBoard(newBoard)
    //cambio turno
    const newTurn = turn === turns.X ? turns.O : turns.X
    setTurn(newTurn)

    //guardo la partida en el localStorage
    saveGameToStorage({
      board: newBoard, 
      turn: newTurn
  })

    //verifico si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti() //celebración
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) //empate
    }
  }

  useEffect(() => {
    console.log('useEffect')
  })

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame} className='reset'>Reset Game</button>
      <section className='"game'>
        {
          board.map((square, index) => {
            return (
              <Square 
                key={index} 
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn=== turns.X}>
          {turns.X}
        </Square>
        <Square isSelected={turn === turns.O}>
          {turns.O}
        </Square>
      </section>
      
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
