import { lobbyPlayers } from '../lobby/index.js'

export const activeGames = {}

const toggleTurn = (room) => {
  const game = activeGames[room]
  if (game.winner === null) {
    game.turn = game.turn === 0 ? 1 : 0
  }
}

const checkWinningLines = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (const [a, b, c] of lines) {
    const isLineComplete =
      board[a] !== null && board[a] === board[b] && board[a] === board[c]

    if (isLineComplete) {
      console.log('line complete')
      return true
    }
  }

  return false
}

const checkGameWinner = (room) => {
  const { board } = activeGames[room]

  if (checkWinningLines(board)) {
    return activeGames[room].turn
  }

  if (!board.includes(null)) {
    console.log('cells complete')
    return -1
  }

  return null
}

const createPlayer = (socketID, playerNumber) => ({
  socketID,
  name: lobbyPlayers[socketID].name || `Player_${playerNumber}`,
  score: 0,
})

export const createGame = (room, socketID_1, socketID_2) => {
  const newGame = {
    room,
    player0: createPlayer(socketID_1, 1),
    player1: createPlayer(socketID_2, 2),
    turn: 0,
    board: Array(9).fill(null),
    winner: null,
  }

  activeGames[room] = newGame

  return newGame
}

export const updateGame = (room, index) => {
  const game = activeGames[room]

  if (game.board[index] !== null) {
    return game
  }

  game.board[index] = game.turn
  game.winner = checkGameWinner(room)
  toggleTurn(room)

  return game
}
