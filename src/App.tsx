import { FormEvent, useEffect, useState } from "react"
import styles from "./styles/App.module.css"

const innitialTable = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]

export function App() {
  const [table, setTable] = useState<string[][]>(innitialTable)
  const [currentPlayer, setCurrentPlayer] = useState('')
  const [gameStarted, setGameStarted] = useState(false)
  const [player1, setPlayer1] = useState("")
  const [player2, setPlayer2] = useState("")
  const [gameFineshed, setGameFineshed] = useState(false)
  const [playerWin, setPlayerWin] = useState("")
  const [playerGame1, setPlayerGame1] = useState("")
  const [playerGame2, setPlayerGame2] = useState("")
  function hasButtonClicked(rowIndex:number, columnIndex: number) {
    if(table[rowIndex][columnIndex] !== "") {
      return true
    } else {
      return false
    }
  }

  function handleStartGame(event: FormEvent<HTMLElement>) {
    event.preventDefault()
  
    if((!player1 || !player2) && !gameStarted) {
      alert("Coloque o nome do(s) jogadores")
    }

    setTable([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ])
    setGameStarted(state => !state)
    setGameFineshed(false)
    setCurrentPlayer(player1)
    setPlayerGame1(player1)
    setPlayerGame2(player2)
    setPlayer1("")
    setPlayer2("")
  }

  console.log(gameStarted)

  function handleClickButtonTable(rowIndex: number, columnIndex: number) {
    if(table[rowIndex][columnIndex] !== "") {
      return
    } 

    setTable(state => {
      return state.map((row, rowIndexMap) => {
        if(rowIndexMap === rowIndex) {
          return row.map((column, columnIndexMap) => {
            if(columnIndexMap === columnIndex) {
              return table[rowIndex][columnIndex] = currentPlayer === playerGame1 ? "X" : "O";
            }
            return column
          })
        }
        return row
      })
    })
    setCurrentPlayer(state => state === playerGame1 ? playerGame2 : playerGame1)
  }


  useEffect(() => {
    if(table[0][0] && table[0][0] === table[0][1] && table[0][1] === table[0][2]) {
      setGameFineshed(true)
      setPlayerWin(currentPlayer === playerGame1 ? playerGame2 : playerGame1)
    }
    else if(table[0][0] && table[0][0] === table[1][0] && table[1][0] === table[2][0]) {
      setGameFineshed(true)
      setPlayerWin(currentPlayer === playerGame1 ? playerGame2 : playerGame1)
    }
    else if(table[1][0] && table[1][0] === table[1][1] && table[1][1] === table[1][2]) {
      setGameFineshed(true)
      setPlayerWin(currentPlayer === playerGame1 ? playerGame2 : playerGame1)
    }
    else if(table[2][0] && table[2][0] === table[2][1] && table[2][1] === table[2][2]) {
      setGameFineshed(true)
      setPlayerWin(currentPlayer === playerGame1 ? playerGame2 : playerGame1)
    }
    else if(table[0][1] && table[0][1] === table[1][1] && table[1][1] === table[2][1]) {
      setGameFineshed(true)
      setPlayerWin(currentPlayer === playerGame1 ? playerGame2 : playerGame1)
    }
    else if(table[0][2] && table[0][2] === table[1][2] && table[1][2] === table[2][2]) {
      setGameFineshed(true)
      setPlayerWin(currentPlayer === playerGame1 ? playerGame2 : playerGame1)
    }
    else if(table[0][2] && table[0][2] === table[1][1] && table[1][1] === table[0][2]) {
      setGameFineshed(true)
      setPlayerWin(currentPlayer === playerGame1 ? playerGame2 : playerGame1)
    }
    else if(table[0][0] && table[0][0] === table[1][1] && table[1][1] === table[2][2]) {
      setGameFineshed(true)
      setPlayerWin(currentPlayer === playerGame1 ? playerGame2 : playerGame1)
    }

    
  }, [table, gameFineshed, currentPlayer, playerGame1, playerGame2])

  return (
    <div className={styles.container}>
      <div className={styles['hash-game']}>
        <form onSubmit={(e) => handleStartGame(e)}>
          <div className={styles['input-wrapper']}>
            <input 
              type="text" 
              placeholder="Digite player 1"
              value={player1} 
              onChange={(e) => setPlayer1(e.currentTarget.value)} 
            />
            <input 
              type="text" 
              placeholder="Digite player 2"
              value={player2}
              onChange={(e) => setPlayer2(e.currentTarget.value)} 
            />
          </div>
          <button>
            {gameStarted ? "Recomeçar" : "Começar"}
          </button>
        </form>
        <p className={styles.paragraphyForm}>
          {!gameStarted ? "" : !gameFineshed  ? `Vez do jogador ${currentPlayer}` : `Jogador ${playerWin} Ganhou`}
        </p>
        <div className={styles['hash-table']}>
          {table.map((row, rowIndex) => {
            return row.map((value, columnIndex) => {
              return (
                <button 
                  disabled={!gameStarted || hasButtonClicked(rowIndex, columnIndex) || gameFineshed} 
                  className={styles['hash-table-button']}
                  onClick={() => handleClickButtonTable(rowIndex, columnIndex)}
                >
                  {value}
                </button>
              )
            })
          })}
        </div>
      </div>
    </div>
  )
}

