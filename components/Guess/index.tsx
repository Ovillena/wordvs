import { ReactElement } from 'react'
import { IGuessComp } from '../../Interfaces'

export default function Guess({
  isGuessed,
  guess,
  word,
}: IGuessComp): ReactElement {
  return (
    <div className="grid grid-cols-6 gap-1 mb-1">
      {new Array(6).fill(0).map((_, i) => {
        const bgColor = !isGuessed
          ? 'bg-black'
          : guess[i] === word[i]
          ? 'bg-green-400'
          : word.includes(guess[i])
          ? 'bg-yellow-400'
          : 'bg-black'
        return (
          <div
            key={`guessKey${i}`}
            className={`h-12 w-12 border border-gray-400 font-bold uppercase text-white
            flex items-center justify-center ${bgColor}`}
          >
            {guess[i]}
          </div>
        )
      })}
    </div>
  )
}
