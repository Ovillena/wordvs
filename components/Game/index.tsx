import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import gameService from '../../services/gameService'
import socketService from '../../services/socketService'
import Guess from '../Guess'
import Querty from '../Qwerty'
import Chat from '../Chat'

export default observer(function game({ gameStore, chatStore }: any) {
  const [isChatMode, setIsChatMode] = useState(false)

  useEffect(() => {
    console.log('chatStore chat: ', chatStore.chat)
    gameStore.init()
    window.addEventListener('keyup', gameStore.handleInput)
    handleGameUpdate()
    handleGameStart()
    return () => {
      window.removeEventListener('keyup', gameStore.handleInput)
    }
  }, [])

  const handleGameUpdate = () => {
    if (socketService.socket) {
      gameService.onGameUpdate(socketService.socket, (newStoreInfo: any) => {
        console.log('new store info : ', newStoreInfo)
        // add player turn
        gameStore.setWord(newStoreInfo.word)
        gameStore.setGuesses(newStoreInfo.guesses)
        gameStore.setCurrentGuess(newStoreInfo.currentGuess)
        gameStore.setIsInRoom(newStoreInfo.isInRoom)
        gameStore.setRoomName(newStoreInfo.roomName)
        gameStore.setIsPlayerTurn(newStoreInfo.turn)
      })
    }
  }

  const handleGameStart = () => {
    if (socketService.socket) {
      gameService.onStartGame(socketService.socket, (options: any) => {
        console.log('start_game : ', options)
        gameStore.setIsGameStarted(options.start)
        if (options.start) {
          gameStore.setIsPlayerTurn(options.turn)
          gameStore.setPlayer(options.player)
        } else {
          gameStore.setIsPlayerTurn(false)
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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3"
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
          {gameStore.guesses.map((_: any, i: number) => (
            <Guess
              key={i}
              word={gameStore.word}
              guess={gameStore.guesses[i]}
              isGuessed={i < gameStore.currentGuess}
            />
          ))}
          word: {gameStore.word} <br></br>
          guesses: {JSON.stringify(gameStore.guesses)} <br></br>
          is in room : {gameStore.isInRoom.toString()} <br></br>
          room name : {gameStore.roomName} <br></br>
          is turn : {gameStore.isPlayerTurn.toString()} <br></br>
          is Game started : {gameStore.isGameStarted.toString()} <br></br>
          You are player {(gameStore.player + 1).toString()} <br></br>
          {gameStore.won && gameStore.isPlayerTurn && (
            <h1>The Other Guy Wins!</h1>
          )}
          {gameStore.won && !gameStore.isPlayerTurn && <h1>You Win!</h1>}
          {gameStore.lost && <h1>You both lose...</h1>}
          {(gameStore.won || gameStore.lost) && (
            <button onClick={gameStore.init}>Play Again!</button>
          )}
          <Querty gameStore={gameStore} />
        </div>
      )}
      {isChatMode && (
        <div className="flex justify-center">
          <Chat gameStore={gameStore} chatStore={chatStore}></Chat>
        </div>
      )}
    </div>
  )
})
