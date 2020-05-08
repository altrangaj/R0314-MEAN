
const Item = require('../models/item')
require('express-async-errors')

const itemController = {
  add: async (request, response) => {
    console.log(request.file)
    const item = new Item({
      picture: { 
        data: request.file.buffer,
        contentType: request.file.mimetype,
        encoding: request.file.encoding
      },
      name: request.body.name,
      details: request.body.details
    })
    await item.save()
    response.status(200).send()
  },
  getAll: async (_request, response) => {
    const data = await Item.find({})

    response.contentType('json')
    const items = data.map(ch => ch.toJSON())
    response.json({ items }) 
  },
  getItem: async (request, response) => {
    const item = await Item.findById(request.params.id)
    response.json(item.toJSON()) 
  },
  update: async (request, response) => {
    const item = await Item.findByIdAndUpdate(request.params.id)
    response.json(item.toJSON()) 
  },
  delete:async (request, response) => {
    await Item.findByIdAndRemove(request.params.id)
    response.status(200).send()
  },
}
module.exports = itemController