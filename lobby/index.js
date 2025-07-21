export const connectedPlayers = {}
export const lobbyPlayers = {}
export let waitingPlayer = null
export const roomConnectKey = '_:room:_'

export const setWaitingPlayer = (socket) => {
  waitingPlayer = socket
}
