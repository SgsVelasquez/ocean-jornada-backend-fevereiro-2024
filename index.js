const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const dbURL = 'mongodb+srv://admin:NMq6WrHl3qSjFPat@cluster0.jf4xsss.mongodb.net/'
const dbname = 'OceanJornadaBackendFev2024'

async function main() {
  const client = new MongoClient(dbURL)

  console.log('Conectando ao banco de dados...')
  await client.connect()
  console.log('Banco de dados conectado com sucesso!')

  const app = express()

  app.get('/', function (req, res) {
    res.send('Hello, World!')
  })

  app.get('/oi', function (req, res) {
    res.send('Olá, mundo!')
  })

  // Lista de Personagens
  const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']
  //              0               1              2

  const db = client.db(dbname)
  const collection = db.collection('items')

  // Read All -> [GET] /item
  app.get('/item', async function (req, res) {
    // Realizamos a operação de find na collection do MongoDB
    const items = await collection.find().toArray()

    // Envio todos os documentos como resposta HTTP
    res.send(items)
  })

  // Read By ID -> [GET] /item/:id
  app.get('/item/:id', async function (req, res) {
    // Acesso o ID no parâmetro de rota
    const id = req.params.id

    // Acesso item na collection baseado no ID recebido
    const item = await collection.findOne({
      _id: new ObjectId(id)
    })

    // Envio o item obtido como resposta HTTP
    res.send(item)
  })

  // Sinalizamos que o corpo da requisição está em JSON
  app.use(express.json())

  // Create -> [POST] /item
  app.post('/item', async function (req, res) {
    // Extraímos o corpo da requisição
    const body = req.body

    // Colocamos o nome dentro da colletion de itens
    await collection.insertOne(item)

    // Enviamos uma resposta de sucesso
    res.send(item)
  })

  //Update -> [PUT] /item/:id
  app.put('/item/:id', async function(req, res) {
    // pega o id recebido pela rota
    const id = req.params.id
    // pega o novo item do corpo
    const novoItem = req.body
    // atualiza o documento na collection
    collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: novoItem}
    )
    // enviamos uma mensagem de sucesso
    res.send('Update by ID')
  })

  app.listen(3000)
}

main()