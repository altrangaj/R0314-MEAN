const fs = require('fs')

console.log('\nprogram started\n')

const readFileP = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, (err, data) => {
    if(err) reject(err)
    resolve(data)
  })
})

readFileP('example.txt')
  .then((result) => console.log('result:\n', result.toString()))
  .catch((reason) => console.log(reason))

for(let i = 0; i < 15; i++)
  console.log('node just keep on...')

console.log('\nprogram ended\n')
