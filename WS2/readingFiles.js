const fsPromises = require('fs').promises

console.log('program started\n')

// 1
/*
fsPromises.readFile('example.txt')
  .then((result) => console.log(result.toString()))
  .then(() => console.log('\nprogram ended'))
  .catch((err) => console.error(err))
*/

// 2
const readfiles = async () => {
  try{
    let result = await fsPromises.readFile('example.txt')
    console.log(result.toString(), '\n\n\n')
    result = await fsPromises.readFile('example2.txt')
    console.log(result.toString())
  } catch (err) {
    console.log(err)
  } finally {
    console.log('\nprogram ended')
  }
}

readfiles()
