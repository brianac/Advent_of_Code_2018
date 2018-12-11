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

const outerGrid = []
let maxValue = 0
let maxPos = []

for(let i = 0; i < gridSize; i++) {
  let row = []
  for(let j = 0; j < gridSize; j++) {
    if (j === 0 || j === gridSize-1 || i === 0 || i === gridSize) {
      row.push('#')
    } else {
      const value = grid[j][i] + grid[j][i+1] + grid[j][i-1] + grid[j+1][i] + grid[j-1][i]
        + grid[j+1][i+1] + grid[j-1][i-1] + grid[j-1][i+1] + grid[j+1][i-1]
      row.push(value)

      if (value > maxValue) {
        maxValue = value
        maxPos = [i, j]
      }
    }
  }
  outerGrid.push(row)
}

console.log(maxPos)
