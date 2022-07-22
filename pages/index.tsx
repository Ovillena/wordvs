import { observer, useLocalObservable } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import Guess from '../components/Guess'
import JoinRoom from '../components/JoinRoom'
import Querty from '../components/Qwerty'
import GameStore from '../stores/GameStore'
import ChatStore from '../stores/ChatStore'
import Game from '../components/Game'

export default observer(function Home() {
  const [isInRoom, setIsInRoom] = useState(false)
  const [isPlayerTurn, setIsPlayerTurn] = useState(false)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isChatMode, setIsChatMode] = useState(false)
  const chatStore = useLocalObservable(() => ChatStore)
  const store = useLocalObservable(() => GameStore)
  useEffect(() => {
    setIsInRoom(store.isInRoom)
    setIsGameStarted(store.isGameStarted)
  }, [store.isInRoom, store.isPlayerTurn, store.isGameStarted])

  return (
    <>
      {!isGameStarted && isInRoom && (
        <>
          <h1 className="text-6xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-green-500">
            Waiting for another player
          </h1>
        </>
      )}
      {!isInRoom && <JoinRoom store={store} />}
      {isInRoom && !isChatMode && <Game store={store} chatStore={chatStore} />}
    </>
  )
})
