let data = ['#.|..#...|#...#...|.|....|..|...#.|...#..|.|.|.|#.','.....|.#...|....#|....||#.|###.......#.#|.##.|...|','...#|.....||..|..|||.#......#..|.#..|..|..#.....|.','..|..#.....###.#|.....|.|...##.##......|#...|##...','....###.......|...|..||...#||.##..|.|.|.#|..|.#...','|..|#......|#.|..#.#....||...|.#||....|#....#.#...','.|..#.|.|..|.#|.#|.#......#..###.|||.#.|.....#...#','..|.|.....||......|...|#....|....##.|.|..|..#.#...','.......##.#..|.|.........|...|..#|.|#.#..||#|...|.','.|###|...|.....|..#.|..|#...|.............|.......','|........##.|.#.##.|##.##..#|..#|.|..|.|....|.....','|.....#|#..#|.|..#..#|...|.#..|#.........|#....|..','..|.#........#........#..||#|.#.........#.|#||.|||','.|##...#..||.....|.|..|..|...|...|..#.....#.###|..','..#|.#|#...|#.|||#..#|#...##.|||#...#.|.|...#.|...','...|...#|..###...#.....|..|...|#..........|..|.|..','#||||.|#.##|....|..||...|##|.....|.|#||..##..||.||','.||.#..|..|||#.#.#|....#..##|#|...|.|#..||..#...#.','..#..#.||.|...|.|||.|#|..#..|.#.........|...#.#|..','|...||#.####||.......#..|#|.#|..|#..#.|....###|#|.','.|.|||.#..#..#.####.##..|#||.#..|#...|...||....|..','.....||#|...#.##........|..##...#...|..##|#.##....','..|#.|#....|##.#|#.#|..#.#......|#....###.##...#.|','..|.#....##...|||..|.#|#..|..|..||#.....#.#..#....','..|..||..##....#.......#..|......|...#.#.##...||#.','..............######|#...|###.##......#...#.|..#.|','.#..|......##..#..||###|.||....#...||..#.##.#.#.||','##.##......##.#|..|.#.#....|#|#|..|#.##|...|.||#..','|.#...##.|#|.|..|.||.|||.......##..#.#..|...##.|..','....#...#...#||.#.#..#...##.#.#...|#.#..#...|..#.|','....#....|.....||.....|.|#.|.|..||..|#........|...','..#...#...|...###.|..#.#.||||....|.....#|........|','##|#..#.#|#..|.||..||..|.||##..##|#.|.##|....#....','|.#|#||.#...#|...#...#|.##.|..##..||#.||#|......|#','|#|..|.||...#...|####...#....#|...|..#..##...|###.','....##.#.|..|......##...|#.###..#....|###.##.||##|','|..#....#..|#.........|....|....##...#....#.#..|..','.......|..|..#...#....##..#.|.#|..#..|.#.#..|||...','..##||.....#..|....|..|#.|#...#.#|....#|#..||#..|.','.#...##.#..#..#..#..|#..#.......||...#.#.|.##...|.','#..|.#.#...#.|...##|..#.#|##.......|.|..#.|#.....#','..|...#|..#|...#......#..#....|.|.#..#..|#|...#..#','.#..##.|.#.##|..##..||.....|#|.|...|..|..#.....|##','.....#...|....|..|..........##.#..|..###.||#...#|#','.#....|......#.#.#.#..#..#..|.....|..|..|.|...#..#','#|....##....###......#.|..|.#..|..|..|||.##.#....#','.|||##.||......#|.#...|......|...|...#.#..#..#..|#','|.#...#|.#|.##......##...#....|.|..|....#.||#.....','.#..|.|.|...|#..#.####|..#..###.....#.##...###.#..','.#.........|.#......|...##.#|...|.####..|...#.###|']

let grid = []

for (let i = 0; i < data.length; i++) {
  const row = data[i].split('')

  grid.push(row)
}

const minutes = 10

const findSurroundingArea = (grid, x, y) => {
  let totals = []

  if (grid[y][x+1]) totals.push(grid[y][x+1])
  if (grid[y][x-1]) totals.push(grid[y][x-1])
  if (grid[y+1] && grid[y+1][x+1]) totals.push(grid[y+1][x+1])
  if (grid[y-1] && grid[y-1][x+1]) totals.push(grid[y-1][x+1])
  if (grid[y-1] && grid[y-1][x]) totals.push(grid[y-1][x])
  if (grid[y+1] && grid[y+1][x]) totals.push(grid[y+1][x])
  if (grid[y-1] && grid[y-1][x-1]) totals.push(grid[y-1][x-1])
  if (grid[y+1] && grid[y+1][x-1]) totals.push(grid[y+1][x-1])

  return totals
}

for (let i = 0; i < minutes; i++) {
  let newGrid = []

  for (let j = 0; j < grid.length; j++) {
    const row = grid[j]
    const newRow = []
    for (let k = 0; k < row.length; k++) {
      const area = row[k]

      const totals = findSurroundingArea(grid, k, j)
      if (area === '.') {
        let trees = totals.filter((item) => {
          return item === '|'
        })

        if (trees.length >= 3) {
          newRow.push('|')
        } else {
          newRow.push('.')
        }
      }
      if (area === '|') {
        let lumberYards = totals.filter((item) => {
          return item === '#'
        })

        if (lumberYards.length >= 3) {
          newRow.push('#')
        } else {
          newRow.push('|')
        }
      }
      if (area === '#') {
        if (totals.includes('#') && totals.includes('|')) {
          newRow.push('#')
        } else {
          newRow.push('.')
        }
      }
    }
    newGrid.push(newRow)
  }

  grid = newGrid
  
  console.log('*******************************************************')
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(''))
  }
}

let trees = 0
let lumberYards = 0

for (let i = 0; i < grid.length; i++) {
  const row = grid[i]
  for (let j = 0; j < row.length; j++) {
    if (row[j] === '|') {
      trees++
    } else if (row[j] === '#') {
      lumberYards++
    }
  }
}

console.log(trees*lumberYards)