const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/oi', function (req, res) {
    res.send("Hello World!");
})

const lista = ['Rick', 'Morty', 'Summer']

app.get('/item', function(req, res) {
  res.send(lista)
})

app.get('/item/:id', function(req, res) {
  const id = req.params.id
  const item = lista[id]
  res.send(item)
})

app.listen(3000)