import { Socket } from 'socket.io-client'

class ChatService {
  public async updateChat(socket: Socket, messages: any) {
    socket.emit('update_chat', messages)
  }

  public async onChatUpdate(socket: Socket, listener: (messages: any) => void) {
    socket.on('on_chat_update', (messages) => {
      return listener(messages)
    })
  }
}

export default new ChatService()
