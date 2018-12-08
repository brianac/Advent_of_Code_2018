const data = ['Step G must be finished before step N can begin.','Step N must be finished before step B can begin.','Step P must be finished before step Q can begin.','Step F must be finished before step U can begin.','Step H must be finished before step A can begin.','Step C must be finished before step S can begin.','Step A must be finished before step K can begin.','Step M must be finished before step O can begin.','Step V must be finished before step L can begin.','Step E must be finished before step L can begin.','Step B must be finished before step Q can begin.','Step W must be finished before step J can begin.','Step R must be finished before step D can begin.','Step D must be finished before step S can begin.','Step S must be finished before step X can begin.','Step Q must be finished before step J can begin.','Step I must be finished before step L can begin.','Step U must be finished before step J can begin.','Step Z must be finished before step X can begin.','Step Y must be finished before step T can begin.','Step J must be finished before step K can begin.','Step T must be finished before step L can begin.','Step K must be finished before step O can begin.','Step O must be finished before step X can begin.','Step L must be finished before step X can begin.','Step Y must be finished before step O can begin.','Step F must be finished before step S can begin.','Step K must be finished before step L can begin.','Step Z must be finished before step O can begin.','Step J must be finished before step X can begin.','Step K must be finished before step X can begin.','Step Q must be finished before step X can begin.','Step Y must be finished before step L can begin.','Step E must be finished before step S can begin.','Step H must be finished before step Y can begin.','Step G must be finished before step P can begin.','Step E must be finished before step K can begin.','Step B must be finished before step L can begin.','Step T must be finished before step K can begin.','Step N must be finished before step R can begin.','Step F must be finished before step E can begin.','Step W must be finished before step Y can begin.','Step U must be finished before step X can begin.','Step A must be finished before step I can begin.','Step Q must be finished before step Y can begin.','Step P must be finished before step T can begin.','Step D must be finished before step X can begin.','Step E must be finished before step Y can begin.','Step F must be finished before step B can begin.','Step P must be finished before step I can begin.','Step N must be finished before step S can begin.','Step F must be finished before step V can begin.','Step W must be finished before step U can begin.','Step F must be finished before step A can begin.','Step I must be finished before step Z can begin.','Step E must be finished before step D can begin.','Step R must be finished before step I can begin.','Step M must be finished before step V can begin.','Step R must be finished before step U can begin.','Step R must be finished before step X can begin.','Step G must be finished before step O can begin.','Step G must be finished before step H can begin.','Step M must be finished before step R can begin.','Step E must be finished before step U can begin.','Step F must be finished before step Z can begin.','Step N must be finished before step Q can begin.','Step U must be finished before step O can begin.','Step J must be finished before step T can begin.','Step W must be finished before step Z can begin.','Step I must be finished before step J can begin.','Step U must be finished before step L can begin.','Step I must be finished before step X can begin.','Step Z must be finished before step J can begin.','Step F must be finished before step D can begin.','Step N must be finished before step O can begin.','Step Q must be finished before step U can begin.','Step G must be finished before step L can begin.','Step H must be finished before step Q can begin.','Step M must be finished before step Q can begin.','Step N must be finished before step D can begin.','Step Z must be finished before step L can begin.','Step I must be finished before step Y can begin.','Step E must be finished before step X can begin.','Step J must be finished before step L can begin.','Step H must be finished before step W can begin.','Step P must be finished before step Y can begin.','Step Q must be finished before step T can begin.','Step Z must be finished before step Y can begin.','Step R must be finished before step T can begin.','Step E must be finished before step J can begin.','Step I must be finished before step T can begin.','Step A must be finished before step L can begin.','Step E must be finished before step R can begin.','Step T must be finished before step O can begin.','Step Y must be finished before step X can begin.','Step A must be finished before step Q can begin.','Step W must be finished before step Q can begin.','Step A must be finished before step T can begin.','Step B must be finished before step Y can begin.','Step H must be finished before step E can begin.','Step H must be finished before step K can begin.']
const data2 = ['Step C must be finished before step A can begin.','Step C must be finished before step F can begin.','Step A must be finished before step B can begin.','Step A must be finished before step D can begin.','Step B must be finished before step E can begin.','Step D must be finished before step E can begin.','Step F must be finished before step E can begin.']

const instructions = {}

data.forEach((step) => {
  const splitStep = step.split(' ')
  const firstStep = splitStep[7]
  const secondStep = splitStep[1]

  if (!instructions[firstStep]) {
    instructions[firstStep] = []
  }
  if (!instructions[secondStep]) {
    instructions[secondStep] = []
  }
  instructions[firstStep].push(secondStep)
})

function findNextStep(inst, comp) {
  for(var i = 0; i < inst.length; i++) {
    const allInstructionsCompleted = comp.filter((elem) => {
      return instructions[inst[i]].indexOf(elem) > -1;
    }).length === instructions[inst[i]].length
  
    if (allInstructionsCompleted) {
      return inst[i]
    }
  }
}

const sortedInstructions = Object.keys(instructions).sort()
const completed = []
const workers = [
  { id: 1, workingOn: null, timeRemaining: 0 },
  { id: 2, workingOn: null, timeRemaining: 0 },
  { id: 3, workingOn: null, timeRemaining: 0 },
  { id: 4, workingOn: null, timeRemaining: 0 },
  { id: 5, workingOn: null, timeRemaining: 0 }
];
let done = false
let tick = 0
const startLength = sortedInstructions.length

while(!done) {
  workers.forEach((worker) => {
    if (worker.timeRemaining === 0) {
      if (worker.workingOn) {
        completed.push(worker.workingOn)

        worker.workingOn = findNextStep(sortedInstructions, completed)

        if (worker.workingOn) {
          sortedInstructions.splice(sortedInstructions.indexOf(worker.workingOn), 1)
          worker.timeRemaining = 60 + worker.workingOn.charCodeAt('0') - 65
        }
      } else {
        worker.workingOn = findNextStep(sortedInstructions, completed)

        if (worker.workingOn) {
          sortedInstructions.splice(sortedInstructions.indexOf(worker.workingOn), 1)
          worker.timeRemaining = 60 + worker.workingOn.charCodeAt('0') - 65
        }
      }
    } else {
      worker.timeRemaining -= 1
    }
  })

  if (completed.length === startLength) {
    done = true
  } else {
    tick += 1
  }
}

console.log(completed.join(''), completed.length, tick-1)
