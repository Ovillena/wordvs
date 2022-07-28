import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import gameService from '../../services/gameService'
import socketService from '../../services/socketService'
import Guess from '../Guess'
import Querty from '../Qwerty'
import Chat from '../Chat'

export default observer(function game({ store, chatStore }: any) {
  const [isChatMode, setIsChatMode] = useState(false)

  useEffect(() => {
    console.log('chatStore chat: ', chatStore.chat)
    store.init()
    window.addEventListener('keyup', store.handleInput)
    handleGameUpdate()
    handleGameStart()
    return () => {
      window.removeEventListener('keyup', store.handleInput)
    }
  }, [])

  const handleGameUpdate = () => {
    if (socketService.socket) {
      gameService.onGameUpdate(socketService.socket, (newStoreInfo: any) => {
        console.log('new store info : ', newStoreInfo)
        // add player turn
        store.setWord(newStoreInfo.word)
        store.setGuesses(newStoreInfo.guesses)
        store.setCurrentGuess(newStoreInfo.currentGuess)
        store.setIsInRoom(newStoreInfo.isInRoom)
        store.setRoomName(newStoreInfo.roomName)
        store.setIsPlayerTurn(newStoreInfo.turn)
      })
    }
  }

  const handleGameStart = () => {
    if (socketService.socket) {
      gameService.onStartGame(socketService.socket, (options: any) => {
        console.log('start_game : ', options)
        store.setIsGameStarted(options.start)
        if (options.start) {
          store.setIsPlayerTurn(options.turn)
          store.setPlayer(options.player)
        } else {
          store.setIsPlayerTurn(false)
        }
      })
    }
  }

  //   useEffect(() => {
  //     handleGameUpdate()
  //     handleGameStart()
  //   }, [])

  return (
    <div className="flex items-start bg-gray-700">
      <button
        onClick={() => {
          setIsChatMode(!isChatMode)
        }}
      >
        {isChatMode ? 'Game' : 'Chat'}
      </button>
      {!isChatMode && (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-700">
          <h1 className="text-6xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-green-500">
            WordVS
          </h1>
          {store.guesses.map((_: any, i: number) => (
            <Guess
              key={i}
              word={store.word}
              guess={store.guesses[i]}
              isGuessed={i < store.currentGuess}
            />
          ))}
          word: {store.word} <br></br>
          guesses: {JSON.stringify(store.guesses)} <br></br>
          is in room : {store.isInRoom.toString()} <br></br>
          room name : {store.roomName} <br></br>
          is turn : {store.isPlayerTurn.toString()} <br></br>
          is Game started : {store.isGameStarted.toString()} <br></br>
          You are player {(store.player + 1).toString()} <br></br>
          {store.won && store.isPlayerTurn && <h1>The Other Guy Wins!</h1>}
          {store.won && !store.isPlayerTurn && <h1>You Win!</h1>}
          {store.lost && <h1>You both lose...</h1>}
          {(store.won || store.lost) && (
            <button onClick={store.init}>Play Again!</button>
          )}
          <Querty store={store} />
        </div>
      )}
      {isChatMode && (
        <div className="flex justify-center">
          <Chat gameStore={store} chatStore={chatStore}></Chat>
        </div>
      )}
    </div>
  )
})
