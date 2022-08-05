// start game VVVVVVVVVVVVVVVVVVVVVVVVV
export interface IStartGameOptions {
  start: boolean
  turn: boolean
  player: number // corresponds to player number, could be username at some point
}
//
// game store VVVVVVVVVVVVVVVVVVVVVVVVV
export interface IGameStoreInfo {
  word: string
  guesses: Array<string>
  currentGuess: number
  isInRoom: boolean
  roomName: string
  isPlayerTurn: boolean
}
export interface IGameStore extends IGameStoreInfo {
  isGameStarted: boolean
  player: number
  won(): boolean
  lost(): boolean
  allGuesses(): Array<string>
  exactGuesses(): Array<string> | null
  inexactGuesses(): Array<string>
  setWord(word: string): void
  setGuesses(guesses: string[]): void
  setCurrentGuess(currentGuess: number): void
  setIsInRoom(isInRoom: boolean): void
  setRoomName(roomName: string): void
  setIsPlayerTurn(isPlayerTurn: boolean): void
  setIsGameStarted(bool: boolean): void
  setPlayer(player: number): void
  init(): void
  submitGuess(): void
  handleInput(e: React.KeyboardEvent | React.BaseSyntheticEvent): void
}
export interface IGuessComp {
  isGuessed: boolean
  guess: string
  word: string
}
//
// chat store VVVVVVVVVVVVVVVVVVVVVVVVV
export interface IChatData {
  roomName: string
  author: number //corresponds to the player number for now. Could change it to username at some point
  message: string
  time: string
}
export interface IChatInfo {
  roomName: string
  chat: Array<IChatData>
  username?: string
}
export interface IChatStore {
  chat: Array<IChatData>
  setChat(newChatData: Array<IChatData>): void
  submitMessage(username: string, roomName: string, messageData: IChatData): void
}
//
// stores VVVVVVVVVVVVVVVVVVVVVVVVV
export interface IStores {
  gameStore: IGameStore
  chatStore: IChatStore
}
export interface IOnlyGameStore {
  gameStore: IGameStore
}
