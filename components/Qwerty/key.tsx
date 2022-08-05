export default function Key({
  char = '',
  bgColor = 'bg-gray-200',
  clickInput = (char: string) => {
    console.log(char)
    //default function. prop passed in from parent component takes over
  },
}) {
  const width =
    char.includes('enter') || char.includes('backspace') ? 'w-16' : 'w-10'

  const handleClick = (char: string) => {
    return clickInput(char)
  }
  return (
    <button
      onClick={handleClick}
      value={char}
      className={`m-1 flex h-10 ${width} items-center justify-center rounded-md ${bgColor}`}
    >
      {char === 'backspace' ? 'delete' : char}
    </button>
  )
}
