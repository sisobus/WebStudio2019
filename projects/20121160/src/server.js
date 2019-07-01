const express = require('express')
const nextjs = require('next')
const bodyParser = require('body-parser')
const cors = require('cors')

const dev = process.env.NODE_ENV !== 'production'
const app = nextjs({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()
    server.use(cors())
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))

    server.get('/work/:workId', (req, res, next) => {
      const route = '/work'
      const queryParams = { workId: req.params.workId }

      app.render(req, res, route, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready at http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
