const data = ['158, 163','287, 68','76, 102','84, 244','162, 55','272, 335','345, 358','210, 211','343, 206','219, 323','260, 238','83, 94','137, 340','244, 172','335, 307','52, 135','312, 109','276, 93','288, 274','173, 211','125, 236','200, 217','339, 56','286, 134','310, 192','169, 192','313, 106','331, 186','40, 236','194, 122','244, 76','159, 282','161, 176','262, 279','184, 93','337, 284','346, 342','283, 90','279, 162','112, 244','49, 254','63, 176','268, 145','334, 336','278, 176','353, 135','282, 312','96, 85','90, 105','354, 312'];

let id = 0;
let maxX = 0;
let maxY = 0;

const transformedData = data.map((coords) => {
  id++
  const splitCoords = coords.split(',')
  const x = parseInt(splitCoords[0])
  const y = parseInt(splitCoords[1].substr(1))

  if (x > maxX) maxX = x
  if (y > maxY) maxY = y

  return { id, x, y }
});

maxX += 2
maxY += 2

let grid = []

for(let i = 0; i < maxY; i++) {
  let row = []
  for(let k = 0; k < maxX; k++) {
    row.push(0)
  }
  grid.push(row)
}

transformedData.forEach((coord) => {
  grid[coord.y][coord.x] = '(' + coord.id + ')';
})

function isOriginalSquare(word) {
  return word && word[0] === '('
};

for(let y = 0; y < maxY; y++) {
  for(let x = 0; x < maxX; x++) {
    const point = grid[y][x]
    let skipCheck = false

    if (isOriginalSquare(point)) {
      skipCheck = true;
    }

    let minPoint = null;
    let minDist = null;

    if (!skipCheck) {
      transformedData.forEach((points) => {
        const dist = Math.abs(points.y-y) + Math.abs(points.x-x)
  
        if (minDist === dist) {
          minPoint = '.'
        }
        if (minDist === null || dist < minDist) {
          minDist = dist
          minPoint = points.id
        }
      })
  
      grid[y][x] = '[' + minPoint + ']'
    }
  }
}

const edgeIds = []
const totals = {}

for(let y = 0; y < maxY; y++) {
  for(let x = 0; x < maxX; x++) {
    const point = grid[y][x]

    if (!isOriginalSquare(point)) {
      if (!totals[point]) {
        totals[point] = 0
      }
      totals[point] += 1
    }

    if (x === 0 || y === 0 || x === maxX-1 || y === maxY-1) {
      if (edgeIds.indexOf(point) === -1) {
        edgeIds.push(point)
      }
    }
  }
}

let highestTotal = { total: 0 }

edgeIds.forEach((id) => {
  totals[id] = 0
})

Object.keys(totals).forEach(function(key) {
  if (totals[key] > highestTotal.total) {
    highestTotal = {
      id: key,
      total: totals[key]
    }
  }
});

//for(let y = 0; y < maxY; y++) {
//  console.log(grid[y].join(''))
//}

console.log(totals, 'Highest:', highestTotal.total+1)
