import React from 'react'
import words from '../words.json'

export default {
  word: '',
  guesses: [''],
  currentGuess: 0,
  isInRoom: false,

  //readonly functions
  get won() {
    return this.guesses[this.currentGuess - 1] === this.word
  },
  get lost() {
    return this.currentGuess === 10
  },
  get allGuesses() {
    return this.guesses.slice(0, this.currentGuess).join('').split('')
  },
  get exactGuesses() {
    return this.word.split('').filter((letter, i) => {
      return this.guesses
        .slice(0, this.currentGuess)
        .map((word) => word[i])
        .includes(letter)
    })
  },
  get inexactGuesses() {
    return this.word
      .split('')
      .filter((letter) => this.allGuesses.includes(letter))
  },

  //game functions
  init() {
    this.word = words[Math.round(Math.random() * words.length)]
    this.guesses.replace(new Array(10).fill(''))
    this.currentGuess = 0
  },
  submitGuess() {
    if (words.includes(this.guesses[this.currentGuess])) {
      this.currentGuess += 1
    }
  },
  handleInput(e: React.KeyboardEvent | React.BaseSyntheticEvent): void {
    let input

    //check if click from Qwerty or keyup
    if (e.type === 'click') {
      input = e.target.value.toLowerCase()
    } else {
      input = e.key.toLowerCase()
    }

    //check if win or lose states and does nothing
    if (this.won || this.lost) {
      return
    }

    //check key pressed or clicked and does input
    if (input === 'enter') {
      return this.submitGuess()
    }
    if (input === 'backspace') {
      this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
        0,
        this.guesses[this.currentGuess].length - 1
      )
      return
    }
    if (this.guesses[this.currentGuess].length < 6 && input.match(/^[A-z]$/)) {
      this.guesses[this.currentGuess] =
        this.guesses[this.currentGuess] + input.toLowerCase()
      console.log(e)
    }
  },

  //socket function
  setInRoom(bool: boolean) {
    this.isInRoom = bool
  },
}
