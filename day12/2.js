let initialState = '##..#..##.#....##.#..#.#.##.#.#.######..##.#.#.####.#..#...##...#....#....#.##.###..#..###...#...#..'
let data = ['#..#. => .','.#..# => #','..#.# => .','..... => .','.#... => #','#..## => #','..##. => #','#.##. => #','#.#.# => .','###.# => #','.#### => .','..### => .','.###. => .','#.#.. => #','###.. => .','##.#. => .','##..# => .','##.## => .','#.### => .','...## => #','##... => #','####. => .','.#.## => .','#...# => #','.#.#. => #','....# => .','.##.. => .','...#. => .','..#.. => .','#.... => .','.##.# => #','##### => #']
// large enough to see the repeating pattern
const generations = 200

const sortedData = data.map((item) => {
  const splitItem = item.split(' ')

  return {
    pot: splitItem[2],
    pattern: splitItem[0]
  }
})

let state = initialState.split('')

const offset = 200

for(let i = 0; i < offset; i++) {
  state.unshift('.')
  state.push('.')
}

let total, prevTotal

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

  prevTotal = total
  total = 0

  for(let i = -offset; i < state.length; i++) {
    if (state[i+offset] === '#') {
      total += i
    }
  }
}

const totalGens = 50000000000

console.log(((totalGens-generations)*(total - prevTotal))+total)
