import { observer } from 'mobx-react-lite'
import Key from './key'

export default observer(function Qwerty({ gameStore }) {
  const qwerty = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']
  return (
    <div>
      {qwerty.map((row) => (
        <div key={row} className="flex justify-center">
          {row === 'zxcvbnm' && (
            <Key
              key="backspace"
              char="backspace"
              clickInput={gameStore.handleInput}
            />
          )}
          {row.split('').map((char) => {
            const bgColor = gameStore.exactGuesses.includes(char)
              ? 'bg-green-400'
              : gameStore.inexactGuesses.includes(char)
              ? 'bg-yellow-400'
              : gameStore.allGuesses.includes(char)
              ? 'bg-gray-800 text-gray-400'
              : 'bg-gray-200'

            return (
              <Key
                key={char}
                char={char}
                clickInput={gameStore.handleInput}
                bgColor={bgColor}
              />
            )
          })}
          {row === 'zxcvbnm' && (
            <Key key="enter" char="enter" clickInput={gameStore.handleInput} />
          )}
        </div>
      ))}
    </div>
  )
})
