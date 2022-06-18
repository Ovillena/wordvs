import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import gameService from '../../services/gameService'
import socketService from '../../services/socketService'
import Guess from '../Guess'
import Querty from '../Qwerty'

export default observer(function game({ store }: any) {
  useEffect(() => {
    store.init()
    window.addEventListener('keyup', store.handleInput)

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
        } else {
          store.setIsPlayerTurn(false)
        }
      })
    }
  }

  useEffect(() => {
    handleGameUpdate()
    handleGameStart()
  }, [])

  return (
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
      {store.won && <h1>You win!</h1>}
      {store.lost && <h1>You lose...</h1>}
      {(store.won || store.lost) && (
        <button onClick={store.init}>Play Again!</button>
      )}
      <Querty store={store} />
    </div>
  )
})
