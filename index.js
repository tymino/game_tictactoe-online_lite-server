import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { handlerLobby } from './handlers/handlerLobby.js'
import { handlerGame } from './handlers/handlerGame.js'

const URL = process.env.URL || 'http://localhost'
const PORT = process.env.PORT || 4000

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: { origin: `*` },
})

app.get('/', (req, res) => {
  res.send(`Server is running, ${URL}:${PORT}`)
})

const onConnection = (socket) => {
  console.log('New connection:', socket.id)

  handlerGame(io, socket)
  handlerLobby(io, socket)
}

io.on('connection', onConnection)

server.listen(PORT, () => {
  console.log(`Server is running, ${URL}:${PORT}`)
})
