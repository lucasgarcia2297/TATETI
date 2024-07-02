import { WINNER_COMBOS } from "../constants";
//Checkear ganador
export const checkWinnerFrom = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo;
        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ) {
            return boardToCheck[a];
        }
    }
    // si no hay ganador 
    return null;
}

  // Chequear si finalizó el juego
export const checkEndGame = (newBoard)=>{
  //si no hay espacios más vacíos en el tablero => empate
  return newBoard.every((square) => square !== null);
}
