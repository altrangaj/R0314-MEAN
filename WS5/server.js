const express = require('express')

const app = express()
const data = {
  users: [
    { n: 'j', a: 25 },
    { n: 'm', a: 42 },
    { n: 's', a: 51 },
  ],
}

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('pages/index', {
    new_heading: 'haloo',
    new_paragraph: 'kukkuu',
    new_footer: 'uusi fuutteri',
  })
})
app.get('/users', (req, res) => {
  res.render('pages/users', data)
})
app.listen(8081)
