import { Socket } from 'socket.io-client'
import { IGameStoreInfo, IStartGameOptions } from '../../Interfaces'

class GameService {
  public async joinGameRoom(socket: Socket, roomId: string): Promise<boolean> {
    return new Promise((result, reject) => {
      socket.emit('join_game', { roomId })
      socket.on('room_joined', () => result(true))
      socket.on('room_joined_error', ({ error }) => reject(error))
    })
  }

  public async updateGame(socket: Socket, gameStoreInfo: IGameStoreInfo) {
    socket.emit('update_game', gameStoreInfo)
  }

  public async onGameUpdate(
    socket: Socket,
    listener: (gameStoreInfo: IGameStoreInfo) => void
  ) {
    socket.on('on_game_update', (gameStoreInfo) => {
      console.log('game store info', gameStoreInfo)
      return listener(gameStoreInfo)
    })
  }

  public async onStartGame(
    socket: Socket,
    listener: (options: IStartGameOptions) => void
  ) {
    socket.on('start_game', listener)
    console.log('listener: ', listener)
  }
}

export default new GameService()
