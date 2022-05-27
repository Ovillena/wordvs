import { observer } from 'mobx-react-lite'
import Key from './key'

export default observer(function Qwerty({ store }) {
  const qwerty = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']
  return (
    <div>
      {qwerty.map((row) => (
        <div key={row} className="flex justify-center">
          {row === 'zxcvbnm' && (
            <Key
              key="backspace"
              char="backspace"
              clickInput={store.handleInput}
            />
          )}
          {row.split('').map((char) => {
            const bgColor = store.exactGuesses.includes(char)
              ? 'bg-green-400'
              : store.inexactGuesses.includes(char)
              ? 'bg-yellow-400'
              : store.allGuesses.includes(char)
              ? 'bg-gray-800 text-gray-400'
              : 'bg-gray-200'

            return (
              <Key
                key={char}
                char={char}
                clickInput={store.handleInput}
                bgColor={bgColor}
              />
            )
          })}
          {row === 'zxcvbnm' && (
            <Key key="enter" char="enter" clickInput={store.handleInput} />
          )}
        </div>
      ))}
    </div>
  )
})
