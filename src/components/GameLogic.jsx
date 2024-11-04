export const slideAndMerge = (line, size) => {
  let newLine = line.filter((num) => num !== 0); //array without 0 --> [2,0,2,4] --> [2,2,4]
  for (let i = 0; i < newLine.length - 1; i++) {
    if (newLine[i] === newLine[i + 1]) {
      //check for same values --> [2,2,4] --> [4,0,4]
      newLine[i] *= 2;
      newLine[i + 1] = 0;
    }
  }
  newLine = newLine.filter((num) => num !== 0); //array without 0 --> [4,0,4] --> [4,4]
  while (newLine.length < size) {
    //get full length of ori. array --> [4,4] --> [4,4,0,0]
    newLine.push(0);
  }
  return newLine;
};

export const addRandomTile = (board, size) => {
  let emptyTiles = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === 0) {
        //exists one field == 0?
        emptyTiles.push([row, col]); //register every field == 0
      }
    }
  }
  if (emptyTiles.length > 0) {
    const [row, col] =
      emptyTiles[Math.floor(Math.random() * emptyTiles.length)]; //get randon number and round down --> random(5) = 2,7 --> index[2]
    board[row][col] = Math.random() < 0.9 ? 2 : 4; //set random tile --> 90% --> 2; 10% --> 4
  }
};

export const moveUp = (board, size) => {
  for (let col = 0; col < size; col++) {
    let column = board.map((row) => row[col]); //extract column from board
    column = slideAndMerge(column, size);
    for (let row = 0; row < size; row++) {
      board[row][col] = column[row]; //back to board
    }
  }
};

export const moveDown = (board, size) => {
  for (let col = 0; col < size; col++) {
    let column = board.map((row) => row[col]).reverse();
    column = slideAndMerge(column, size).reverse();
    for (let row = 0; row < size; row++) {
      board[row][col] = column[row];
    }
  }
};

export const moveLeft = (board, size) => {
  for (let row = 0; row < size; row++) {
    board[row] = slideAndMerge(board[row], size);
  }
};

export const moveRight = (board, size) => {
  for (let row = 0; row < size; row++) {
    board[row] = slideAndMerge(board[row].reverse(), size).reverse();
  }
};

export const checkGameOver = (board, size) => {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === 0) return false;
      if (col < size - 1 && board[row][col] === board[row][col + 1])
        return false;
      if (row < size - 1 && board[row][col] === board[row + 1][col])
        return false;
    }
  }
  return true;
};
