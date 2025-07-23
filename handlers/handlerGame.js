import { activeGames, updateGame, clearBoard } from '../game/index.js'

export const handlerGame = (io, socket) => {
  const sendGameState = () => {
    io.to(socket.room).emit('game:update', activeGames[socket.room])
  }

  socket.on('game:move', (index) => {
    console.log('game:move', socket.room, index)
    updateGame(socket.room, index)
    sendGameState()

    if (activeGames[socket.room].winner !== null) {
      const delayAnim = 2000

      setTimeout(() => {
        console.log('end round')
        clearBoard(socket.room)
        sendGameState()
      }, delayAnim)
    }
  })

  socket.on('disconnect', () => {
    console.log('Disconnected game: ', socket.id)

    if (activeGames[socket.room]) {
      console.log('game end, room: ', socket.room)
      io.to(socket.room).emit('game:close')
      delete activeGames[socket.room]
    }
  })
}
