const data = 640441

const recipes = [3, 7]

let elfOneIndex = 0
let elfTwoIndex = 1

while(recipes.length < data + 10) {
  // make next recipe
  let newRecipe = elfOneIndex > elfTwoIndex 
    ? recipes[elfOneIndex] + recipes[elfTwoIndex]
    : recipes[elfTwoIndex] + recipes[elfOneIndex]

  newRecipe = newRecipe.toString().split('')

  newRecipe.forEach(recipe => {
    recipes.push(parseInt(recipe))
  });

  // Move elves to new recipe
  elfOneIndex += recipes[elfOneIndex] + 1
  elfTwoIndex += recipes[elfTwoIndex] + 1

  while (elfOneIndex >= recipes.length) {
    elfOneIndex = elfOneIndex - recipes.length
  }
  while (elfTwoIndex >= recipes.length) {
    elfTwoIndex = elfTwoIndex - recipes.length
  }
}

let answer = ''

for (let i = data; i < data+10; i++) {
  answer += recipes[i]
}

console.log(answer)