const data = '455 players; last marble is worth 71223 points'

const splitData = data.split(' ')

const players = parseInt(splitData[0])
const lastMarble = parseInt(splitData[6])*100
const grid = [0]
let lastIndex = 0
let scores = {}

for (let i = 1; i <= lastMarble; i++) {
	if (i%23 === 0) {
        const player = i%players+1
        
        console.log(i, lastMarble)

		lastIndex -= 7

		if (lastIndex < 0) {
			lastIndex = grid.length + lastIndex
		}

		const value = i + grid[lastIndex]

		grid.splice(lastIndex, 1)

		if (!scores[player]) {
			scores[player] = 0
		}
    scores[player] += value
	} else {
		lastIndex += 2

		if (grid.length < lastIndex) {
			lastIndex = 1
		}
	
		grid.splice(lastIndex, 0, i)
	}
}

let highest = { value: 0, player: null }

Object.keys(scores).forEach((key) => {
  if (scores[key] > highest.value) {
		highest = {
			value: scores[key],
			player: key
		}
	}
})

console.log(scores, highest)