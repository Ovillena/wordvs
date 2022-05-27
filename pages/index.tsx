import { observer, useLocalObservable } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import Guess from '../components/Guess'
import JoinRoom from '../components/JoinRoom'
import Querty from '../components/Qwerty'
import PuzzleStore from '../stores/PuzzleStore'
import Game from '../components/Game'

export default observer(function Home() {
  const [isInRoom, setIsInRoom] = useState(false)
  const store = useLocalObservable(() => PuzzleStore)

  useEffect(() => {
    // store.init()
    setIsInRoom(store.isInRoom)
    // window.addEventListener('keyup', store.handleInput)
    // console.log('is in room', isInRoom)

    // return () => {
    //   window.removeEventListener('keyup', store.handleInput)
    // }
  }, [store.isInRoom])

  return (
    <>
      {!isInRoom && <JoinRoom store={store} />}
      {isInRoom && <Game store={store} />}
      {/* {isInRoom && (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-700">
          <h1 className="text-6xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-green-500">
            WordVS
          </h1>
          {store.guesses.map((_, i) => (
            <Guess
              key={i}
              word={store.word}
              guess={store.guesses[i]}
              isGuessed={i < store.currentGuess}
            />
          ))}
          word: {store.word} <br></br>
          guesses: {JSON.stringify(store.guesses)}
          {store.won && <h1>You win!</h1>}
          {store.lost && <h1>You lose...</h1>}
          {(store.won || store.lost) && (
            <button onClick={store.init}>Play Again!</button>
          )}
          <Querty store={store} />
        </div>
      )} */}
    </>
  )
})
