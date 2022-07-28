import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import gameService from '../../services/gameService'
import chatService from '../../services/chatService'
import socketService from '../../services/socketService'
import ScrollToBottom from 'react-scroll-to-bottom'

export default observer(function chat({ gameStore, chatStore }: any) {
  const [currentMessage, setCurrentMessage] = useState('')
  const [messageList, setMessageList] = useState([])

  useEffect(() => {
    setMessageList(chatStore.chat)
    handleChatUpdate()
    console.log('chattttStore: ', chatStore.chat)
  }, [chatStore.chat])

  const handleSendMessage = () => {
    const currentTime = new Date(Date.now())
    const messageData = {
      roomName: gameStore.roomName,
      author: gameStore.player,
      message: currentMessage,
      time:
        currentTime.getHours() +
        ':' +
        currentTime.getMinutes() +
        ':' +
        currentTime.getSeconds(),
    }
    if (currentMessage !== '') {
      chatStore.submitMessage(gameStore.player, gameStore.roomName, messageData)
    }
  }

  const handleChatUpdate = () => {
    if (socketService.socket) {
      chatService.onChatUpdate(socketService.socket, (newChatInfo: any) => {
        console.log('new chat info : ', JSON.stringify(newChatInfo.chat))
        // add player turn
        chatStore.setChat(newChatInfo.chat)
      })
    }
  }

  //   const handleGameUpdate = () => {
  //     if (socketService.socket) {
  //       chatService.onChatUpdate(socketService.socket, (newStoreInfo: any) => {
  //         console.log('new store info : ', newStoreInfo)
  //         // add player turn
  //         store.setWord(newStoreInfo.word)
  //         store.setGuesses(newStoreInfo.guesses)
  //         store.setCurrentGuess(newStoreInfo.currentGuess)
  //         store.setIsInRoom(newStoreInfo.isInRoom)
  //         store.setRoomName(newStoreInfo.roomName)
  //         store.setIsPlayerTurn(newStoreInfo.turn)
  //       })
  //     }
  //   }

  return (
    <>
      {/* <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          className="chat-input"
          onChange={(event) => {
            setCurrentMessage(event.target.value)
          }}
        ></input>
        <button onClick={handleSendMessage}>&#9658;</button>
      </div> */}

      <div className="chat-window">
        <div className="chat-header">
          <p>Live Chat</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent) => {
              return (
                <div
                  className="message"
                  key={`${messageContent.time}${messageContent.author}`}
                  id={
                    gameStore.player === messageContent.author ? 'you' : 'other'
                  }
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">Player {messageContent.author + 1}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
              setCurrentMessage(event.target.value)
            }}
            onKeyPress={(event) => {
              event.key === 'Enter' && handleSendMessage()
            }}
          />
          <button onClick={handleSendMessage}>&#9658;</button>
        </div>
      </div>
    </>
  )
})
