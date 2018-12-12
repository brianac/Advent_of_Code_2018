const data = 9221

// Doesn't work, negative numbers get too high in summed grid I think

const gridSize = 300
let grid = []

// Make initial grid
for(let i = 0; i < gridSize; i++) {
  let row = []
  for(let j = 0; j < gridSize; j++) {
    const x = j+1
    const y = i+1
    const rackId = x+10
    const powerLevel = ((y*rackId)+data)*rackId
    const hundreth = powerLevel.toString().slice(-3,-2)
    const value = parseInt(hundreth)-5
    row.push(value)
  }
  grid.push(row)
}

const summedGrid = []

// Make summed grid
for(let i = 0; i < gridSize; i++) {
  let row = []
  for(let j = 0; j < gridSize; j++) {
    let value = grid[i][j]

    if (j > 0) {
      value += row[j-1]
    }
    if (i > 0) {
      value += summedGrid[i-1][j]
    }
    row.push(value)
  }
  summedGrid.push(row)
}

let maxValue = -100
let maxPos = []

// calculate max in sum grid
for(let i = 0; i < gridSize; i++) {
  for(let j = 0; j < gridSize; j++) {
    for(let squareSize = 0; squareSize < gridSize; squareSize++) {
      if (summedGrid[i+squareSize] && summedGrid[i+squareSize][j+squareSize] && i > 0 && j > 0) {
        const a = summedGrid[i-1][j-1]
        const b = summedGrid[i-1][j+squareSize]
        const c = summedGrid[i+squareSize][j-1]
        const d = summedGrid[i+squareSize][j+squareSize]
        const value = a + d - c - b

        if (value > maxValue) {
          maxValue = value
          maxPos = [i, j, squareSize, value]
        }
      }
    }
  }
}

console.log(maxPos)
