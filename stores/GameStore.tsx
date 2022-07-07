import React from 'react'
import words from '../words.json'
import socketService from '../services/socketService'
import gameService from '../services/gameService'

export default {
  word: '',
  guesses: [''],
  currentGuess: 0,
  isInRoom: false,
  roomName: '',
  isPlayerTurn: false,
  isGameStarted: false,

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

  //setters
  setWord(word: string) {
    this.word = word
  },
  setGuesses(guesses: string[]) {
    this.guesses = guesses
  },
  setCurrentGuess(currentGuess: number) {
    this.currentGuess = currentGuess
  },
  setIsInRoom(bool: boolean) {
    this.isInRoom = bool
  },
  setRoomName(roomName: string) {
    this.roomName = roomName
  },
  setIsPlayerTurn(turn: boolean) {
    this.isPlayerTurn = turn
  },
  setIsGameStarted(bool: boolean) {
    this.isGameStarted = bool
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

      // get store to emit this.word, this.guesses, this.currentGuess, this.roomName
      if (socketService.socket) {
        // this should probably not be in submit guess.
        gameService.updateGame(socketService.socket, {
          // be in its own function
          word: this.word,
          guesses: this.guesses,
          currentGuess: this.currentGuess,
          roomName: this.roomName,
          isInRoom: this.isInRoom,
          turn: true,
        })
      }
      //set player turn to false after submitting
      this.setIsPlayerTurn(false)
    }
  },
  handleInput(e: React.KeyboardEvent | React.BaseSyntheticEvent): void {
    if (!this.isPlayerTurn) {
      return
    }

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
    //key or click inputs for letters
    if (this.guesses[this.currentGuess].length < 6 && input.match(/^[A-z]$/)) {
      this.guesses[this.currentGuess] =
        this.guesses[this.currentGuess] + input.toLowerCase()
    }
  },
}
