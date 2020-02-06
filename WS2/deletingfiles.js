const fsPromises = require('fs').promises

// 5 & 7
fsPromises.unlink('newdata/output.txt')
  .then(() => console.log('file deleted'))
  .then(() => fsPromises.rmdir('newdata'))
  .then(() => console.log('directory deleted'))
  .catch((err) => console.log(err))
