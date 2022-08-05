import { Socket } from 'socket.io-client'
import { IChatInfo } from '../../Interfaces'

class ChatService {
  public async updateChat(socket: Socket, messages: IChatInfo) {
    socket.emit('update_chat', messages)
  }

  public async onChatUpdate(
    socket: Socket,
    listener: (messages: IChatInfo) => void
  ) {
    socket.on('on_chat_update', (messages) => {
      return listener(messages)
    })
  }
}

export default new ChatService()
