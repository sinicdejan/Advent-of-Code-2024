import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  const rows = input.split('\n')

  const map1 = rows.map(row => parseInt(row.split(/\s+/)[0]))
  const map2 = rows.map(row => parseInt(row.split(/\s+/)[1]))

  map1.sort()
  map2.sort()

  let result = 0

  for(let i = 0; i < map1.length; i++) {
    result += Math.abs(map2[i] - map1[i])
  }
  
  return result
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  const rows = input.split('\n')

  const map1 = rows.map(row => parseInt(row.split(/\s+/)[0]))
  const map2 = rows.map(row => parseInt(row.split(/\s+/)[1]))

  map1.sort()
  map2.sort()

  let result = 0

  let counter = 0
  let index = 0
  let previousVal = null

  for(let i = 0; i < map1.length; i++) {
    if(previousVal !== map1[i]) {
      counter = 0

      for(let j = index; j < map2.length; j++) {
        if(map1[i] < map2[j]) break
        if(map1[i] === map2[j]) counter++
        if(map1[i] > map2[j]) continue
      }
    }

    result += map1[i] * counter

    previousVal = map1[i]
  }

  return result
}

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
