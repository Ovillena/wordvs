import React from 'react'
import socketService from '../services/socketService'
import gameService from '../services/gameService'
import chatService from '../services/chatService'
import { IChatData } from '../Interfaces'

export default {
  chat: [
    {
      roomName: '',
      author: 0,
      message: '',
      time: '',
    },
  ],

  setChat(newChatData: Array<IChatData>): void {
    if (
      this.chat[0].roomName === '' &&
      this.chat[0].author === 0 &&
      this.chat[0].message === '' &&
      this.chat[0].time === ''
    ) {
      this.chat.shift()
    }
    this.chat = newChatData
  },

  submitMessage(username: string, roomName: string, messageData: IChatData) {
    if (
      this.chat[0].roomName === '' &&
      this.chat[0].author === 0 &&
      this.chat[0].message === '' &&
      this.chat[0].time === ''
    ) {
      this.chat.shift()
    }
    this.chat = [...this.chat, messageData]
    console.log('chat Store Chat: ', this.chat)
    console.log('chat Store messageData: ', messageData)

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
