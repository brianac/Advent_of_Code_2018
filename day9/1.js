const data = '455 players; last marble is worth 71223 points'

const demo = '9 players; last marble is worth 25 points'
const demo2 = '10 players; last marble is worth 1618 points: high score is 8317'
const demo3 = '13 players; last marble is worth 7999 points: high score is 146373'
const demo4 = '30 players; last marble is worth 5807 points: high score is 37305'

const splitData = demo2.split(' ')

const players = parseInt(splitData[0])
const lastMarble = parseInt(splitData[6])*100
const grid = [0]
let lastIndex = 0
let scores = {}

for (let i = 1; i <= lastMarble; i++) {
	if (i%23 === 0) {
		const player = i%players+1

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