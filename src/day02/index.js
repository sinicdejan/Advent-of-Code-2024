import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  let data = input.split('\n').map(line => line.split(' ').map(Number))

  let result = 0

  // increasing
  for (let i = 0; i < data.length; i++) {
    for (let j = 1; j < data[i].length; j++) {
      let diff = data[i][j - 1] - data[i][j]
      if (diff < 1 || diff > 3) break
      if (j + 1 === data[i].length) result++
    }
  }

  // decreasing
  for (let i = 0; i < data.length; i++) {
    for (let j = 1; j < data[i].length; j++) {
      let diff = data[i][j] - data[i][j - 1]
      if (diff < 1 || diff > 3) break
      if (j + 1 === data[i].length) result++
    }
  }

  return result
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  let data = input.split('\n').map(line => line.split(' ').map(Number))

  let result = 0

  let dataWithError = []

  let decreasingReports = []
  let increasingReports = []

  for(let i = 0; i < data.length; i++) {
    let positives = 0
    let negatives = 0

    for(let j = 1; j < data[i].length; j++) {
      let diff = data[i][j] - data[i][j - 1]
      if(diff > 0) positives++ 
      else if(diff < 0) negatives++
    }

    if(negatives > positives) decreasingReports.push(data[i])
    else if(positives > negatives) increasingReports.push(data[i])
  }

  // increasing
  for(let i = 0; i < increasingReports.length; i++) {
    for(let j = 1; j < increasingReports[i].length; j++) {
      let diff = increasingReports[i][j] - increasingReports[i][j - 1]
      if(diff < 1 || diff > 3) {
        let dataCopy1 = [...increasingReports[i]]
        dataCopy1.splice(j - 1, 1)
        dataWithError.push(dataCopy1)

        let dataCopy2 = [...increasingReports[i]]
        dataCopy2.splice(j, 1)
        dataWithError.push(dataCopy2)
        break
      }
      if(j + 1 === increasingReports[i].length) result++
    }
  }
  
  // decreasing
  for(let i = 0; i < decreasingReports.length; i++) {
    for(let j = 1; j < decreasingReports[i].length; j++) {
      let diff = decreasingReports[i][j - 1] - decreasingReports[i][j]
      if(diff < 1 || diff > 3) {
        let dataCopy1 = [...decreasingReports[i]]
        dataCopy1.splice(j - 1, 1)
        dataWithError.push(dataCopy1)

        let dataCopy2 = [...decreasingReports[i]]
        dataCopy2.splice(j, 1)
        dataWithError.push(dataCopy2)
        break
      }
      if(j + 1 === decreasingReports[i].length) result++
    }
  }

  // increasing
  for (let i = 0; i < dataWithError.length; i++) {
    for (let j = 1; j < dataWithError[i].length; j++) {
      let diff = dataWithError[i][j - 1] - dataWithError[i][j]
      if (diff < 1 || diff > 3) break
      if (j + 1 === dataWithError[i].length) {
        result++
        if(i % 2 == 0) i++
      }
    }
  }
  
  // decreasing
  for (let i = 0; i < dataWithError.length; i++) {
    for (let j = 1; j < dataWithError[i].length; j++) {
      let diff = dataWithError[i][j] - dataWithError[i][j - 1]
      if (diff < 1 || diff > 3) break
      if (j + 1 === dataWithError[i].length) {
        result++
        if(i % 2 == 0) i++
      }
    }
  }

  return result
}

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4,
      },
      {
        input: `2 4 6 9 10 9
74 71 73 74 76 79 81
45 48 51 52 55 58 60 60
49 52 54 57 58 61 64 68
48 50 47 48 51 54 55
48 50 49 51 54 55
48 50 47 51 54 55`,
        expected: 6,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})