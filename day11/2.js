const data = 9221

const gridSize = 300
const grid = []

for(let i = 0; i < gridSize; i++) {
  let row = []
  for(let j = 0; j < gridSize; j++) {
    const x = j+1
    const y = i+1
    const rackId = x+10
    const powerLevel = ((y*rackId)+data)*rackId
    const hundreth = powerLevel.toString().slice(-3,-2)
    const value = parseInt(hundreth)-5 // powerLevel hundreth
    row.push(value)
  }
  grid.push(row)
}

let maxValue = 0
let maxPos = []

for(let i = 0; i < gridSize; i++) {
  for(let j = 0; j < gridSize; j++) {
    for(let squareSize = 1; squareSize < (gridSize - i); squareSize++) {
      let value = 0
      for(let x = i; x < i + squareSize; x++) {
        for(let y = j; y < j + squareSize; y++) {
          value += grid[x][y];
        }
      }

      if (value > maxValue) {
        maxValue = value
        maxPos = [j+1, x+1, squareSize]
        console.log(maxPos);
      }
    }
  }
}

console.log(maxPos)
