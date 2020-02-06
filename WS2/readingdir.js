const fsPromises = require('fs').promises

// 6
fsPromises.readdir('.')
  .then((result) => console.log(result))
  .catch((err) => console.log(err))
