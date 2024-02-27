const express = require('express')
const { MongoClient } = require('mongodb')

const dbURL = 'mongodb+srv://admin:NMq6WrHl3qSjFPat@cluster0.jf4xsss.mongodb.net/'
const dbname = 'OceanJornadaBackendFev2024'

async function main() {
  const client = new MongoClient(dbURL)

  console.log('Conectando')
  await client.connect()
  console.log('Conectado')

  const app = express()

  app.get('/', function (req, res) {
    res.send('Hello World')
  })

  app.get('/oi', function (req, res) {
    res.send("Hello World!");
  })

  const lista = ['Rick', 'Morty', 'Summer']

  app.get('/item', function (req, res) {
    //envia lista
    res.send(lista)
  })

  app.get('/item/:id', function (req, res) {
    //Acesso id no parametro de rota
    const id = req.params.id
    //Acesso item na lista baseado no id
    const item = lista[id]
    //enviando o item como resposta
    res.send(item)
  })

  //sinalizando que o corpo da req e JSON
  app.use(express.json())

  //Creat POST
  app.post('/item', function (req, res) {
    //Extraindo o corpo da req
    const body = req.body

    //pegando o nome que foi enviado
    const item = body.nome

    //colocando nome dentro da lista item
    lista.push(item)

    //enviando uma resposta
    res.send('item adicionado')
  })

  app.listen(3000)
}

main()