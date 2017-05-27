import express from 'express'
import { join } from 'path'

const {
  PORT = 1337,
  HOST = '0.0.0.0'
} = process.env

const app = express()

app.use('/', express.static(join(__dirname, 'dist')))
app.use('*', express.static(join(__dirname, 'dist', 'index.html')))

app.listen(PORT, HOST, () => console.log(`Server started on ${HOST}:${PORT}...`))
