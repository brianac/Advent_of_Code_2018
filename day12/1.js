let initialState = '##..#..##.#....##.#..#.#.##.#.#.######..##.#.#.####.#..#...##...#....#....#.##.###..#..###...#...#..'
let data = ['#..#. => .','.#..# => #','..#.# => .','..... => .','.#... => #','#..## => #','..##. => #','#.##. => #','#.#.# => .','###.# => #','.#### => .','..### => .','.###. => .','#.#.. => #','###.. => .','##.#. => .','##..# => .','##.## => .','#.### => .','...## => #','##... => #','####. => .','.#.## => .','#...# => #','.#.#. => #','....# => .','.##.. => .','...#. => .','..#.. => .','#.... => .','.##.# => #','##### => #']
const generations = 20

const sortedData = data.map((item) => {
  const splitItem = item.split(' ')

  return {
    pot: splitItem[2],
    pattern: splitItem[0]
  }
})

let state = initialState.split('')

const offset = 30

for(let i = 0; i < offset; i++) {
  state.unshift('.')
  state.push('.')
}

for(let i = 0; i < generations; i++) {
  let newState = []
  for(let j = 0; j < state.length; j++) {
    if (j < 2 || j >= state.length-2) {
      newState.push(state[j])
    } else {
      const pattern = state[j-2] + state[j-1] + state[j] + state[j+1] + state[j+2]

      const matchingPattern = sortedData.find((elem) => pattern === elem.pattern)

      if (matchingPattern) {
        newState.push(matchingPattern.pot)
      } else {
        newState.push('.')
      }
    }
  }

  state = newState
}

let total = 0

for(let i = -offset; i < state.length; i++) {
  if (state[i+offset] === '#') {
    total += i
  }
}

console.log(total)
