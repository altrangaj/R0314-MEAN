const fs = require('fs')

console.log('\nprogram started\n')
const data = fs.readFileSync('example.txt')
console.log(data.toString())

for (let i = 0; i < 15; i++) console.log('node just keep on...')

console.log('\nprogram ended\n')
