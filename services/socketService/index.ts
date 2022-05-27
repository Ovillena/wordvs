import { io, Socket } from 'socket.io-client'

// singleton/single-instance pattern
class SocketService {
  public socket: Socket | null = null

  public connect(url: string): Promise<Socket> {
    return new Promise((result, reject) => {
      this.socket = io(url)

      if (!this.socket) {
        return reject()
      }
      this.socket.on('connect', () => {
        result(this.socket as Socket)
      })

      this.socket.on('connect_error', (err) => {
        console.log('Connection Error: ', err)
        reject(err)
      })
    })
  }
}

// whatever imports this will have single instance initiated
export default new SocketService()
