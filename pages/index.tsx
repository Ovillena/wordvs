import {observer, useLocalObservable} from "mobx-react-lite";
import { useEffect } from "react";
import Guess from "../components/Guess";
import Querty from "../components/Qwerty";
import PuzzleStore from "../stores/PuzzleStore";


export default observer(function Home(){

  const store = useLocalObservable(()=> PuzzleStore)

useEffect(()=>{
 store.init()

 window.addEventListener('keyup', store.handleInput)

 return ()=> {
   window.removeEventListener('keyup', store.handleInput)
 }
},[])

  return <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-700">
    <h1 className="text-6xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-green-500">WordVS</h1>
    
    {store.guesses.map((_,i)=>(
          <Guess key={i} word={store.word} guess={store.guesses[i]} isGuessed={i<store.currentGuess}/>
    ))}
    word: {store.word} <br></br>
    guesses: {JSON.stringify(store.guesses)}
    {store.won && <h1>You win!</h1>}
    {store.lost && <h1>You lose...</h1>}
    {(store.won || store.lost) && <button onClick={store.init}>Play Again!</button>}
    <Querty store={store}/>
  </div>
})