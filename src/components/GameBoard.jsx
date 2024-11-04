import { useEffect, useState } from "react";
import Tile from "./Tile";
import "../styles/GameBoard.css";
import { addRandomTile, moveDown, moveLeft, moveRight, moveUp, checkGameOver } from "./GameLogic";

const GameBoard = () => {
  const SIZE = 4;
  const [board, setBoard] = useState(() =>
    Array.from({ length: SIZE }, () => Array(SIZE).fill(0))
  );
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    const newBoard = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
    addRandomTile(newBoard, SIZE);
    addRandomTile(newBoard, SIZE);
    setBoard(newBoard);
    setGameOver(false);
  };

  const handleMove = (direction) => {
    if (gameOver) return;
    
    const newBoard = board.map((row) => (Array.isArray(row) ? [...row] : row));

    const originalBoard = JSON.stringify(newBoard);

    switch (direction) {
      case "up":
        moveUp(newBoard, SIZE);
        break;
      case "down":
        moveDown(newBoard, SIZE);
        break;
      case "left":
        moveLeft(newBoard, SIZE);
        break;
      case "right":
        moveRight(newBoard, SIZE);
        break;
      default:
        return;
    }

    if (JSON.stringify(newBoard) !== originalBoard) {
      addRandomTile(newBoard, SIZE);
      setBoard(newBoard);

      if (checkGameOver(newBoard, SIZE)) {
        setGameOver(true);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          handleMove("up");
          break;
        case "ArrowDown":
          handleMove("down");
          break;
        case "ArrowLeft":
          handleMove("left");
          break;
        case "ArrowRight":
          handleMove("right");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [board, gameOver]);

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="game-container">
      <h1>2048</h1>
      <table className="game-table">
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <Tile key={cellIndex} value={cell} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {gameOver && <h2>Game Over!</h2>}
      <button onClick={startGame}>Neues Spiel</button>
    </div>
  );
};

export default GameBoard;
