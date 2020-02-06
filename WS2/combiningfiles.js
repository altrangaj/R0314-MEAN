const fsPromises = require('fs').promises

console.log('program started\n')

// 3
/*
const combine = async () => {
  try {
    let result = (await fsPromises.readFile('example.txt')).toString()
    result += (await fsPromises.readFile('example2.txt')).toString()
    await fsPromises.writeFile('output.txt', result)
  } catch (err) {
    console.log(err)
  } finally {
    console.log('\nprogram ended')
  }
}
*/

// 4 & 7
const combine = async () => {
  let filehandle
  try {
    await fsPromises.mkdir('newdata')
    filehandle = await fsPromises.open('newdata/output.txt', 'w')
    let result = (await fsPromises.readFile('example.txt')).toString()
    result += (await fsPromises.readFile('example2.txt')).toString()
    await filehandle.appendFile('I wrote this!\n\n')
    await filehandle.appendFile(result)
    await filehandle.appendFile('\n\nI wrote this!')
  } catch (err) {
    console.log(err)
  } finally {
    filehandle.close()
    console.log('\nprogram ended')
  }
}

combine()
