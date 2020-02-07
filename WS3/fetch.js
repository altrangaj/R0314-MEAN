const axios = require('axios')

const fetchJSON = async (url) => {
  let result
  let error
  try{
    const response = await axios.get(url)
    result = response.data
    return { result, error }
  } catch (err) {
    return { result, error: err }
  }
}

module.exports = fetchJSON
