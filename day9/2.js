const data = '455 players; last marble is worth 71223 points'

const splitData = data.split(' ')

class LinkedList {
  constructor() {
    this.currentNode = new Node(0);
    this.currentNode.prev = this.currentNode;
    this.currentNode.next = this.currentNode;
  }

  addNode(value) {
    let node = this.currentNode

    for(let i = 0; i < 1; i++) {
      node = node.next
    }
    const newNode = new Node(value, node, node.next)

    node.next.prev = newNode
    node.next = newNode
    
    this.currentNode = newNode
  }

  removeNode() {
    let node = this.currentNode

    for(let i = 0; i < 7; i++) {
      node = node.prev
    }

    const prevNode = node.prev
    const nextNode = node.next

    prevNode.next = nextNode
    nextNode.prev = prevNode

    this.currentNode = nextNode

    return node.value
  }
}

class Node {
  constructor(value, prev = null, next = null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

const players = parseInt(splitData[0])
const lastMarble = parseInt(splitData[6])*100
let lastIndex = 0
let scores = {}
const list = new LinkedList()

for (let i = 1; i <= lastMarble; i++) {
	if (i%23 === 0) {
    const player = i%players+1
		const value = i + list.removeNode()

		if (!scores[player]) {
			scores[player] = 0
		}
    scores[player] += value
	} else {
    list.addNode(i)
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
