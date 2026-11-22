const moves = [
  [1, -2],
  [2, -1],
  [2, 1],
  [1, 2],
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
];

const gridSize = 8;

function guardRails(position) {
  return (
    Array.isArray(position) &&
    position.length === 2 &&
    Number.isInteger(position[0]) &&
    Number.isInteger(position[1]) &&
    position[0] >= 0 &&
    position[0] < gridSize &&
    position[1] >= 0 &&
    position[1] < gridSize
  );
}

function getKnightMoves(start, goal) {
  if (!guardRails(start)) {
    throw new Error("Invalid Start");
  }
  if (!guardRails(goal)) {
    throw new Error("Invalid Goal");
  }

  return knightMoves(start, goal);
}

function knightMoves(start, goal) {
  const parents = new Map();
  const queue = [start];

  parents.set(start.toString(), null);

  while (queue.length > 0) {
    const current = queue.shift();
    if (current[0] === goal[0] && current[1] === goal[1]) {
      const result = [];
      let step = current;
      while (step !== null) {
        result.push(step);
        step = parents.get(step.toString());
      }
      return result.toReversed();
    }
    for (let move of moves) {
      const currentMove = [];
      currentMove[0] = move[0] + current[0];
      currentMove[1] = move[1] + current[1];

      if (!guardRails(currentMove)) continue;
      if (parents.has(currentMove.toString())) continue;

      parents.set(currentMove.toString(), current);
      queue.push(currentMove);
    }
  }
  throw new Error("No Path Found");
}

console.log(getKnightMoves([0, 0], [7, 7]));
console.log("-------------");
console.log(getKnightMoves([0, 0], [1, 2]));
console.log("-------------");
console.log(getKnightMoves([3, 3], [3, 3]));
console.log("-------------");
console.log(getKnightMoves([7, 7], [0, 0]));

// console.log(getKnightMoves([0, 0], [8, 8]));
// console.log(getKnightMoves([0.5, 0], [7, 7]));
// console.log(getKnightMoves([-1, 0], [1, 2]));
