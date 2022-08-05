import React, { useState } from 'react'
import { IJoinRoomProps, IOnlyGameStore } from '../../Interfaces'
import { observer } from 'mobx-react-lite'
import gameStore from '../../stores/GameStore'
import socketService from '../../services/socketService'
import gameService from '../../services/gameService'

export default observer(function JoinRoom({ gameStore }: IOnlyGameStore) {
  const [roomName, setRoomName] = useState('')
  const [isJoining, setIsJoining] = useState(false)

  const handleRoomNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setRoomName(value)
  }

  const joinRoom = async (e: React.FormEvent) => {
    e.preventDefault()
    const socket = socketService.socket
    if (!roomName || roomName.trim() === '' || !socket) {
      return
    }
    setIsJoining(true)

    const joined = await gameService
      .joinGameRoom(socket, roomName)
      .catch((error) => {
        alert(error)
        console.log('error joined: ', error)
      })

    if (joined) {
      gameStore.setIsInRoom(true)
      gameStore.setRoomName(roomName)
    }
    setIsJoining(false)
  }

  return (
    <>
      <form onSubmit={joinRoom}>
        <h4>Enter Room ID to Join the Game</h4>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomName}
          onChange={handleRoomNameChange}
        ></input>
        <button
          type="submit"
          className="m-1 w-10 h-10 items-center justify-center rounded-md bg-gray-200"
          disabled={isJoining}
        >
          {isJoining ? 'Joining...' : 'join'}
        </button>
      </form>
    </>
  )
})
