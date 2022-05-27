import { Socket } from 'socket.io-client'

class GameService {
  public async joinGameRoom(socket: Socket, roomId: string): Promise<boolean> {
    return new Promise((result, reject) => {
      socket.emit('join_game', { roomId })
      socket.on('room_joined', () => result(true))
      socket.on('room_joined_error', ({ error }) => reject(error))
    })
  }

  // TODO: figure out this matrix stuff
  public async updateGame(socket: Socket, gameMatrix: any) {
    socket.emit('update_game', { matrix: gameMatrix })
  }

  public async onGameUpdage(socket: Socket, listener: (matrix: any) => void) {
    socket.on('on_game_update', ({ matrix }) => listener(matrix))
  }
}

export default new GameService()
