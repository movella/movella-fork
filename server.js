const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mysql = require('mysql')
const cors = require('cors')
const sha1 = require('sha1')

const app = express()
const port = process.env.PORT || 5000

/* let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'movella'
}) */

const connection = () => {
  const temp = mysql.createConnection({
    host: '',
    user: 'root',
    password: '',
    database: '',
    port: '3306',
  })

  temp.connect()

  temp.on('error', e => log(e))

  return temp
}

const log = (...d) => console.log(d)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const { Movel } = require('./model')

app.post('/api/moveis', (req, res) => {

  // pagina
  // quantidade

  let { pagina, quantidade } = req.body

  pagina = pagina || 1
  quantidade = quantidade || 2

  const con = connection()
  con.query(`select * from view_movel limit ${quantidade} offset ${(pagina - 1) * quantidade}`, (error, results, fields) => {
    log(results)
    if (error) {
      log(error)
      res.status(500).send({ msg: error.message })
    } else {
      res.status(200).send({ data: results })
    }
  })
  con.end()
})

app.post('/api/moveis/create', (req, res) => {

  let movel = new Movel()

  let {
    id,
    categoriaId,
    usuarioId,
    descricao,
    imagem,
    nome,
    valorMes,
    disponivel,
    altura,
    largura,
    espessura,
  } = req.body

  try {
    //movel.Id = id
    //movel.CategoriaId = categoriaId
    movel.UsuarioId = usuarioId
    movel.Descricao = descricao
    movel.Imagem = 'default.png'
    movel.Nome = nome
    movel.ValorMes = valorMes
    movel.Disponivel = 1
    movel.Altura = altura
    movel.Largura = largura
    movel.Espessura = espessura
  } catch (err) {
    res.status(400).send({ msg: err })
    console.log(err)
    return
  }

  const con = connection()
  con.query(movel.Insert(), (error, results, fields) => {
    log(results)
    if (error) {
      log(error)
      res.status(500).send({ msg: error.message })
    } else {
      res.status(200).send({ msg: 'Móvel cadastrado' })
    }
  })
  con.end()
})

app.post('/api/login', (req, res) => {

  // email
  // senha

  let { email, senha } = req.body

  email = email || ''
  senha = senha || ''

  const con = connection()
  con.query(`select * from tbl_usuario where email = '${email}' and senha = '${sha1(senha)}' limit 1`, (error, results, fields) => {
    log(results)
    if (error) {
      log(error)
      res.status(500).send({ msg: error.message })
    } else if (results.length === 1) {
      res.status(200).send({ data: results[0] })
    } else {
      res.status(400).send({ msg: 'Usuário não encontrado' })
    }
  })
  con.end()
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

app.listen(port, () => console.log(`Listening on port ${port}`))
