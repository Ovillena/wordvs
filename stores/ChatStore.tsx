import React from 'react'
import words from '../words.json'
import socketService from '../services/socketService'
import gameService from '../services/gameService'
import chatService from '../services/chatService'

export default {
  chat: [],
  submitMessage(username: string, roomName: string, messageData: any) {
    this.chat.push({ messageData })
    console.log('chat chat', this.chat)

    if (socketService.socket) {
      chatService.updateChat(socketService.socket, {
        roomName: roomName,
        chat: this.chat,
        username: username,
      })
    }
  },
  //   player1: '',
  //   player2: '',
  //   setPlayer(username: string, playerNum: number) {
  //     if (playerNum === 1) {
  //       this.player1 = username
  //     } else {
  //       this.player2 = username
  //     }
  //   },
  // mvp just show chat username as 'me' and 'opponent'
}
