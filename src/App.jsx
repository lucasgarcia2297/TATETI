import { useState } from 'react';
import './App.css'
const TURN = {
  X:'x',
  O:'o'
};


//Cuadrado del tablero
const Square = ({children, isSelected, updateBoard, index})=>{ 
  
  // Para darle estilo al turno siguiente
  const className=`square ${isSelected ? 'is-selected' : ''} `;
  
  // Para controlar el siguiente turno
  const handlerClick = ()=>{
    updateBoard(index);
  }

  return (
    <div className={className} onClick={handlerClick}>
      {children}
    </div>
  )
}
const WINNER_COMBOS=[
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
  [0, 4, 8], [2, 4, 6]             // Diagonales
];


function App() {
 // ===========================ESTADOS===========================
  // Tablero
  const [board,setBoard] = useState(Array(9).fill(null));

  //Turno
  const [turn, setTurn] = useState(TURN.X);
  
  //Ganador: null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null);
  //===============================================================

  //===========================FUNCIONES===========================
  // Resetear el Juego
  const resetGame = ()=>{
    setBoard(Array(9).fill(null));
    setTurn(TURN.X);
    setWinner(null);
  }
  //Checkear ganador
  const checkWinner = (boardToCheck) =>{
    for (const combo of WINNER_COMBOS){
      const [a,b,c] = combo;
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a];
      }
    }
    // si no hay ganador 
    return null;
  }
  // Actualizar Tablero
  const updateBoard = (index)=> {
    
    //si ya hay algo en la celda, cancelo
    if(board[index] || winner) return 
    
    /*Creo un nuevo board 
    PARA LOS ESTADOS, ES IMPORTANTE CREAR UNO NUEVO Y NO MUTARLO */
    const newBoard = [...board]; 
    newBoard[index] = turn;
    setBoard(newBoard);
    
    // Actualizo el turno
    const newTurno = turn === TURN.X ? TURN.O : TURN.X;
    setTurn(newTurno);
    
    //Revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if(newWinner){
      setWinner(newWinner);

    } else if(checkEndGame(newBoard)){
      setWinner(false);
    }

  }
  // Chequear si finalizó el juego
  const checkEndGame = (newBoard)=>{
    //si no hay espacios más vacíos en el tablero => empate
    return newBoard.every((square) => square !== null);
  }

  //===============================================================

  return(
    <main className='board'>
    <h1>Ta-Te-Ti</h1>
    <button onClick={resetGame}>Reiniciar</button>

    {/*-----------Sección del Tablero-----------*/ }
    <section className='game'>
      {board.map((square,index)=> {
        return (
          <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
          >
            {square}
            </Square>  
          )
      })}
    </section>
    {/*---------------------------------------*/ }

    {/*-----------Sección del turno-----------*/ }
    <section className='turn'>
      <Square isSelected={turn === TURN.X}>
        {TURN.X}
      </Square>
      <Square isSelected={turn === TURN.O}>
        {TURN.O}
      </Square>
    </section>
    {/*---------------------------------------*/ }
    
    {/*------------Mostrar ganador------------*/ }
    { winner !== null && (
        <section className='winner'>
          <div className='text'>
            <h2>{ winner === false ? 'Empate' : 'Ganó: ' }</h2>

            <header className='win'>
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          
          </div>
        </section>
      )
    }
    {/*---------------------------------------*/ }
  </main>
 )
}

export default App
