import { useState } from 'react';
import './App.css'
import { Board } from './Components/Board';
import { Square } from './Components/Square';
import { TURN } from "./constants.js";
import { WinnerModal } from './Components/WinnerModal.jsx';
import confetti from 'canvas-confetti';
import { checkWinnerFrom, checkEndGame } from './logic/board.js';
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'


function App() {
  // ===========================ESTADOS===========================
  // Tablero  
  const [board, setBoard] = useState(() =>{
    const boardFromStorage = window.localStorage.getItem('board')
    if(boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null);  
  });
  //Turno
  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURN.X;
  });

  //Ganador: null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null);
  //===============================================================

  //===========================FUNCIONES===========================
  // Resetear el Juego
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURN.X);
    setWinner(null);
    
    resetGameStorage();
  }
  // Actualizar Tablero
  const updateBoard = (index) => {

    //si ya hay algo en la celda, cancelo
    if (board[index] || winner) return

    /*Creo un nuevo board 
    PARA LOS ESTADOS, ES IMPORTANTE CREAR UNO NUEVO Y NO MUTARLO */
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // Actualizo el turno
    const newTurn = turn === TURN.X ? TURN.O : TURN.X;
    setTurn(newTurn);

    //Guardar partida en LocalStorage
    saveGameToStorage({
      board:newBoard,
      turn:newTurn
    });

    //Revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  }
  return (
    <main className='board'>
      <h1>Ta-Te-Ti</h1>
      <button onClick={resetGame}>Reiniciar</button>
      <Board board={board} updateBoard={updateBoard}/>

      {/*-----------Sección del turno-----------*/}
      <section className='turn'>
        <Square isSelected={turn === TURN.X}>
          {TURN.X}
        </Square>
        <Square isSelected={turn === TURN.O}>
          {TURN.O}
        </Square>
      </section>
      {/*---------------------------------------*/}

      <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
    </main>
  )
}

export default App
