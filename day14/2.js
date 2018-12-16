//const data = 640441
const data = '59414'

const recipes = [3, 7]

let elfOneIndex = 0
let elfTwoIndex = 1

let found = false

while(!found) {
  // make next recipe
  const elfOneScore = recipes[elfOneIndex]
  const elfTwoScore = recipes[elfTwoIndex]
  let newRecipe = elfOneScore + elfTwoScore

  if (newRecipe < 10) {
    recipes.push(newRecipe);
  }
  else {
    recipes.push(1);
    recipes.push(newRecipe % 10);
  }

  // Move elves to new recipe
  elfOneIndex += elfOneScore + 1
  elfTwoIndex += elfTwoScore + 1

  while (elfOneIndex >= recipes.length) {
    elfOneIndex = elfOneIndex - recipes.length
  }
  while (elfTwoIndex >= recipes.length) {
    elfTwoIndex = elfTwoIndex - recipes.length
  }

  if (recipes.length > data.length) {
    let answer = ''

    for (let i = recipes.length - data.length; i < recipes.length; i++) {
      answer += recipes[i]
    }

    if (answer.toString() === data) {
      found = true
      console.log(answer, recipes.length - data.length)
    }
  }
}
