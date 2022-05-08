import { useEffect, useState } from "react";
import "./Game.css";

const Square = (props) => {
  return <button onClick={props.onClick}>{props.num}</button>;
};

const Board = () => {
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [turn, setTurn] = useState(false);

  const winner = calculateWinner(squares);
  const notice = winner ? `Winner is ${winner}` : `${turn ? "O" : "X"} Turns!`;

  //   useEffect(() => {
  //     console.log(`useEffect 실행 : ${squares}`);
  //   }, []);

  const onClick = (idx) => {
    if (winner || squares[idx]) return;

    let newSquares = squares.slice();

    newSquares[idx] = turn ? "O" : "X";
    setSquares(newSquares);
    // setSquares((squares) => {
    //   squares[idx] = turn ? "O" : "X";
    //   return squares;
    // });
    setTurn((turn) => !turn);
  };

  return (
    <>
      <div>{notice}</div>
      {[0, 1, 2].map((i) => (
        <div key={i} className="board-row">
          {[0, 1, 2].map((j) => (
            <Square
              key={j}
              num={squares[i * 3 + j]}
              onClick={() => onClick(i * 3 + j)}
            />
          ))}
        </div>
      ))}
    </>
  );
};

const Game = () => {
  return (
    <>
      <div></div>
      <Board />
      <div></div>
    </>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Game;
