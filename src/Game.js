import React, { useEffect, useState } from "react";
import "./Game.css";

const Square = (props) => {
  return <button onClick={props.onClick}>{props.num}</button>;
};

const Board = (props) => {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <div key={i} className="board-row">
          {[0, 1, 2].map((j) => (
            <Square
              key={j}
              num={props.squares[i * 3 + j]}
              onClick={() => props.onClick(i * 3 + j)}
            />
          ))}
        </div>
      ))}
    </>
  );
};

const Game = () => {
  const [history, setHistory] = useState([new Array(9).fill(null)]);
  const [turn, setTurn] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);
  const squares = history[stepNumber];
  const winner = calculateWinner(squares);
  const notice = winner ? `Winner is ${winner}` : `${turn ? "O" : "X"} Turns!`;

  const jumpTo = (idx) => {
    setStepNumber(idx);
    setHistory((history) => history.slice(0, idx + 1));
    setTurn(idx % 2 === 0);
  };

  const moves = history.map((step, idx) => (
    <li key={idx} onClick={() => jumpTo(idx)}>
      {idx === 0 ? `Go to game start` : `Go to move ${idx}`}
    </li>
  ));

  const onClick = (idx) => {
    if (winner || squares[idx]) return;

    setStepNumber((stepNumber) => stepNumber + 1);
    setHistory((history) => {
      const newSquares = squares.slice();
      newSquares[idx] = turn ? "O" : "X";
      return [...history.slice(0, stepNumber + 1), newSquares];
    });
    setTurn((turn) => !turn);
  };

  return (
    <>
      <div>{notice}</div>
      <Board squares={squares} onClick={onClick} />
      <div>
        <ol>{moves}</ol>
      </div>
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
