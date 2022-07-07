import { observer, useLocalObservable } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import Guess from '../components/Guess'
import JoinRoom from '../components/JoinRoom'
import Querty from '../components/Qwerty'
import gameStore from '../stores/GameStore'
import Game from '../components/Game'

export default observer(function Home() {
  const [isInRoom, setIsInRoom] = useState(false)
  const [isPlayerTurn, setIsPlayerTurn] = useState(false)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isChatMode, setIsChatMode] = useState(false)
  const store = useLocalObservable(() => gameStore)
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
      {isInRoom && !isChatMode && <Game store={store} />}
    </>
  )
})
